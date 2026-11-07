
from app.services.rag_service import search_knowledge_base

questions = [
    "Why can't I connect to my corporate VPN?",
    "My Outlook emails are not synchronizing. How can I fix this?",
    "My Windows 11 computer is running slowly. What should I do?"
]

for question in questions:
    print("\n" + "=" * 70)
    print(f"EMPLOYEE QUESTION: {question}")
    print("=" * 70)

    results = search_knowledge_base(question, top_k=3)

    if not results:
        print("No relevant documents found.")
        continue

    for result in results:
        print(f"\nSOURCE: {result['source']}")
        print(f"DISTANCE: {result['distance']:.4f}")
        print(f"RETRIEVED CONTENT:\n{result['content']}")
