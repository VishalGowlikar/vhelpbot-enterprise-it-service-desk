
from dotenv import load_dotenv
from google import genai

# Load API credentials from backend/.env
load_dotenv()

try:
    # Gemini SDK reads GEMINI_API_KEY automatically
    client = genai.Client()

    print("Connecting to Google Gemini...")

    response = client.interactions.create(
        model="gemini-3.6-flash",
        input=(
            "You are VHelpbot, an enterprise IT support assistant. "
            "Introduce yourself in two sentences."
        )
    )

    print("\nSUCCESS! Gemini API connection works.")
    print("\nGemini response:")
    print(response.output_text)

except Exception as error:
    print("\nGemini API request failed.")
    print("Error type:", type(error).__name__)
    print("Error details:", str(error))
