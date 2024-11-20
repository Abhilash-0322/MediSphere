# import serial
# import time
# from threading import Thread, Lock
# from queue import Queue
# import logging

# class SerialReader:
#     def __init__(self, port='COM10', baud_rate=115200, timeout=1):
#         """Initialize the SerialReader with connection parameters."""
#         self.port = port
#         self.baud_rate = baud_rate
#         self.timeout = timeout
#         self.serial_connection = None
#         self.is_running = False
#         self.thread = None
#         self.lock = Lock()
#         self.data_queue = Queue()
#         self.logger = self._setup_logger()

#     def _setup_logger(self):
#         """Set up logging configuration."""
#         logger = logging.getLogger('SerialReader')
#         logger.setLevel(logging.INFO)
#         if not logger.handlers:
#             handler = logging.StreamHandler()
#             formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
#             handler.setFormatter(formatter)
#             logger.addHandler(handler)
#         return logger

#     def connect(self):
#         """Establish serial connection."""
#         try:
#             self.serial_connection = serial.Serial(
#                 port=self.port,
#                 baudrate=self.baud_rate,
#                 timeout=self.timeout
#             )
#             time.sleep(2)  # Wait for Arduino to initialize
#             self.logger.info(f"Connected to {self.port} at {self.baud_rate} baud")
#             return True
#         except serial.SerialException as e:
#             self.logger.error(f"Connection error: {e}")
#             return False

#     def disconnect(self):
#         """Close the serial connection."""
#         with self.lock:
#             if self.serial_connection and self.serial_connection.is_open:
#                 self.serial_connection.close()
#                 self.logger.info("Serial connection closed")

#     def _read_serial(self):
#         """Internal method to continuously read from serial port."""
#         while self.is_running:
#             try:
#                 if self.serial_connection and self.serial_connection.is_open:
#                     line = self.serial_connection.readline().decode('latin-1').strip()
#                     if line:
#                         self.data_queue.put(line)
#             except serial.SerialException as e:
#                 self.logger.error(f"Reading error: {e}")
#                 break
#             except Exception as e:
#                 self.logger.error(f"Unexpected error: {e}")
#                 break

#     def start_reading(self):
#         """Start the serial reading thread."""
#         if not self.is_running:
#             if not self.serial_connection or not self.serial_connection.is_open:
#                 if not self.connect():
#                     return False
            
#             self.is_running = True
#             self.thread = Thread(target=self._read_serial, daemon=True)
#             self.thread.start()
#             self.logger.info("Serial reading thread started")
#             return True
#         return False

#     def stop_reading(self):
#         """Stop the serial reading thread."""
#         self.is_running = False
#         if self.thread:
#             self.thread.join(timeout=1.0)
#         self.disconnect()
#         self.logger.info("Serial reading stopped")

#     def get_reading(self):
#         """Get the latest reading from the queue."""
#         try:
#             return self.data_queue.get_nowait()
#         except:
#             return None

#     def clear_buffer(self):
#         """Clear the data queue."""
#         while not self.data_queue.empty():
#             self.data_queue.get()

#     def __enter__(self):
#         """Context manager entry."""
#         self.connect()
#         self.start_reading()
#         return self

#     def __exit__(self, exc_type, exc_val, exc_tb):
#         """Context manager exit."""
#         self.stop_reading()

import serial
import time

class HeartRateReader:
    def __init__(self, serial_port, baud_rate=115200, timeout=1):
        """
        Initialize the HeartRateReader with the specified serial port and baud rate.
        """
        self.serial_port = serial_port
        self.baud_rate = baud_rate
        self.timeout = timeout
        self.ser = None

    def connect(self):
        """
        Establishes a connection with the serial port.
        """
        try:
            self.ser = serial.Serial(self.serial_port, self.baud_rate, timeout=self.timeout)
            print(f"Connected to {self.serial_port} at {self.baud_rate} baud.")
            time.sleep(2)  # Wait for Arduino to initialize
            if self.ser and self.ser.is_open:
                line = self.ser.readline().decode('latin-1').strip()
                return line
        except serial.SerialException as e:
            print(f"Error: {e}")
            self.ser = None

    def disconnect(self):
        """
        Closes the serial connection if open.
        """
        if self.ser and self.ser.is_open:
            self.ser.close()
            print("Serial connection closed.")

    def read_data(self):
        """
        Reads and returns data from the serial port.
        """
        if self.ser and self.ser.is_open:
            line = self.ser.readline().decode('latin-1').strip()
            return line
        else:
            print("Serial connection not established.")
            return None

    def continuous_read(self):
        """
        Continuously reads data from the serial port.
        """
        if not self.ser or not self.ser.is_open:
            self.connect()

        try:
            while True:
                data = self.read_data()
                if data:
                    print(f"Heart Readings: {data}")
        except KeyboardInterrupt:
            print("Program interrupted. Exiting...")
        finally:
            self.disconnect()

if __name__ == "__main__":
    reader = HeartRateReader(serial_port='COM10')  # Update COM10 as needed
    reader.continuous_read()