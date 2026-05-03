import time
import threading
import logging
from typing import Callable, Optional

logger = logging.getLogger(__name__)


class Keepalive:
    """
    Sends periodic pings and detects missed responses to signal liveness loss.
    """

    def __init__(
        self,
        send_ping: Callable[[], None],
        on_timeout: Callable[[], None],
        interval: float = 20.0,
        timeout: float = 10.0,
    ) -> None:
        self.send_ping = send_ping
        self.on_timeout = on_timeout
        self.interval = interval
        self.timeout = timeout

        self._lock = threading.Lock()
        self._thread: Optional[threading.Thread] = None
        self._stop_event = threading.Event()
        self._last_response = time.monotonic()
        self._active = False

    def start(self) -> None:
        with self._lock:
            if self._active:
                return
            self._active = True
            self._stop_event.clear()
            self._last_response = time.monotonic()
            self._thread = threading.Thread(target=self._run, daemon=True)
            self._thread.start()
            logger.info("Keepalive started (interval=%ss, timeout=%ss)", self.interval, self.timeout)

    def stop(self) -> None:
        with self._lock:
            if not self._active:
                return
            self._active = False
            self._stop_event.set()
        if self._thread is not None:
            self._thread.join(timeout=2.0)
            self._thread = None
        logger.info("Keepalive stopped")

    def notify_response(self) -> None:
        with self._lock:
            self._last_response = time.monotonic()

    def _run(self) -> None:
        last_ping = time.monotonic()
        while not self._stop_event.wait(0.5):
            now = time.monotonic()

            # Send ping on interval
            if now - last_ping >= self.interval:
                try:
                    self.send_ping()
                except Exception as exc:
                    logger.debug("Ping send failed (will retry): %s", exc)
                last_ping = now

            # Detect missed responses
            if now - self._last_response >= self.timeout:
                logger.warning("Keepalive timeout (no response for %ss)", self.timeout)
                try:
                    self.on_timeout()
                finally:
                    # Stop after triggering timeout to avoid repeated callbacks
                    self.stop()
                    break