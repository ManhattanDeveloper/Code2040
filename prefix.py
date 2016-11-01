import requests

#Code2040 Step 4

submission_address = "http://challenge.code2040.org/api/prefix/validate"
question_address = "http://challenge.code2040.org/api/prefix"
api_token = "7167a46b9b5df35ac1a07346e00a9ef1"
answer_list = []

# Sneds api_token to question_address to get the data.
json_data = {"token" : api_token}
res = requests.post(question_address, data=json_data)
json_data_dict = res.json();

# Parse the prefix and array from incoming json_data
prefix = json_data_dict.get("prefix")
prefix_length = len(prefix)
arr = json_data_dict.get("array")

#Selects the elements that don't have the prefix
for i in arr:
	if i[:prefix_length] != prefix:
		answer_list.append(i)

# Send answer back to the submission endpoint for validation.
answer_json = {"token" : api_token, "array" : answer_list}
ultimate_response = requests.post(submission_address, json=answer_json)
