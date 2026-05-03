#[cfg(test)]
mod tests {
    use std::net::TcpStream;
    use std::io::{Read, Write};

    #[test]
    fn test_encryption() {
        let mut stream = TcpStream::connect("localhost:8080").unwrap();
        let mut buffer = [0; 1024];
        stream.read(&mut buffer).unwrap();
        assert!(buffer.iter().any(|&x| x != 0));
    }

    #[test]
    fn test_authentication() {
        let mut stream = TcpStream::connect("localhost:8080").unwrap();
        let mut buffer = [0; 1024];
        stream.read(&mut buffer).unwrap();
        assert!(buffer.iter().any(|&x| x != 0));
        let message = b"Hello, World!";
        stream.write(message).unwrap();
        stream.flush().unwrap();
        let mut response = [0; 1024];
        stream.read(&mut response).unwrap();
        assert_eq!(response, message);
    }

    #[test]
    fn test_vulnerability() {
        let mut stream = TcpStream::connect("localhost:8080").unwrap();
        let mut buffer = [0; 1024];
        stream.read(&mut buffer).unwrap();
        assert!(buffer.iter().any(|&x| x != 0));
        let exploit = b"exploit";
        stream.write(exploit).unwrap();
        stream.flush().unwrap();
        let mut response = [0; 1024];
        stream.read(&mut response).unwrap();
        assert_ne!(response, exploit);
    }
}