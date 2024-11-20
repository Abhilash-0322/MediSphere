import serial
import time

# Configure the serial connection
serial_port = 'COM10'  # Update with your Arduino's serial port (e.g., COM3 on Windows)
baud_rate = 115200            # Must match the baud rate in the Arduino code

def read_from_serial():
    try:
        # Open the serial connection
        with serial.Serial(serial_port, baud_rate, timeout=1) as ser:
            print(f"Connected to {serial_port} at {baud_rate} baud.")
            time.sleep(2)  # Wait for Arduino to initialize

            while True:
                # Read a line from the serial port
                line = ser.readline().decode('latin-1').strip()
                if line:
                    print(f"Heart Readings: {line}")

    except serial.SerialException as e:
        print(f"Error: {e}")
    except KeyboardInterrupt:
        print("Program interrupted. Exiting...")

if __name__ == "__main__":
    read_from_serial()