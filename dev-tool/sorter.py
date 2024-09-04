import re

# Read data from list.txt (as text)
with open('list.txt', 'r', encoding='utf-8') as file:
    content = file.read()

# Use regex to find all objects within the array-like structure
pattern = r'{\s*[^{}]*?\s*}'  # Matches objects in array-like JavaScript format
matches = re.findall(pattern, content, re.DOTALL)

# Initialize options list to store extracted data
options = []

# Process each match found
for match in matches:
    try:
        # Clean up match by removing comments and trailing commas
        clean_match = re.sub(r'/\*.*?\*/', '', match)  # Remove comments
        clean_match = re.sub(r',\s*}', '}', clean_match)  # Remove trailing commas
        
        # Convert single quoted keys to double quoted keys
        clean_match = re.sub(r'([{\s,])\'([^:\'"]+)\':', r'\1"\2":', clean_match)
        
        # Extract followers count directly from string
        followers_match = re.search(r'followers:\s*"([^"]+)"', clean_match)
        followers = followers_match.group(1) if followers_match else "0"
        
        # Convert followers count to a comparable format
        if " million subscribers" in followers:
            followers_count = float(followers.replace(" million subscribers", ""))
        else:
            followers_count = 0.0
        
        # Append option along with followers count to list
        options.append((clean_match, followers_count))
    
    except Exception as e:
        print(f"Error processing match: {e}")

# Sort options by followers count (descending)
sorted_options = sorted(options, key=lambda x: x[1], reverse=True)

# Assign new ids based on ranking starting from owner12
rank = 1
for index, (option, _) in enumerate(sorted_options):
    # Replace the existing id with a new id based on the current rank
    new_id = f"owner{rank}"
    sorted_options[index] = (re.sub(r'id:\s*"owner\d+"', f'id: "{new_id}"', option), _)
    rank += 1

# Write sorted options to a new file
with open('sorted_list_with_ranking.txt', 'w', encoding='utf-8') as outfile:
    for option, _ in sorted_options:
        outfile.write(option + '\n')

print("Sorted data with new ids based on ranking saved to sorted_list_with_ranking.txt")
