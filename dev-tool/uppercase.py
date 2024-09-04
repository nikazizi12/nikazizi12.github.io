# Open the input file
input_filename = 'input.txt'
output_filename = 'output.txt'

try:
    with open(input_filename, 'r') as file:
        text = file.read()

    # Convert the text to uppercase
    text_upper = text.upper()

    # Write the uppercase text to output file
    with open(output_filename, 'w') as file:
        file.write(text_upper)

    print(f"Successfully converted {input_filename} to uppercase. Saved as {output_filename}")

except FileNotFoundError:
    print(f"Error: {input_filename} not found.")
except IOError:
    print(f"Error: Unable to read or write file.")
