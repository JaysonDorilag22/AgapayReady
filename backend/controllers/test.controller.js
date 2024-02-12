export const test = (req, res) => {
    res.json({
      message: 'API is working!',
    });
  };
  
  export const handleTestEvent = (io) => (req, res) => {
    try {
      // Emit a test event to all connected clients
      io.emit("test_event", { message: "This is a test event" });
  
      return res.status(200).json({ success: true, message: "Test event emitted successfully" });
    } catch (error) {
      console.error("Error emitting test event:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };

  export const sendMessage = (io) => (req, res) => {
    try {
      const { message } = req.body;
  
      // Emit the received message to all connected clients
      io.emit("received_message", { message });
  
      return res.status(200).json({ success: true, message: "Message sent successfully" });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ success: false, error: "Internal server error" });
    }
  };