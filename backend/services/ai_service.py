import asyncio
import datetime
import json
import random
import time
from typing import AsyncGenerator, Dict, List, Any
import httpx
from ..config import settings

AVAILABLE_MODELS = [
    {
        "id": "gpt-4o",
        "name": "GPT-4o (Omni)",
        "provider": "OpenAI",
        "category": "Flagship Multi-Modal",
        "context_window": "128k tokens",
        "latency": "42ms",
        "cost_per_1k": 0.005,
        "description": "High-intelligence flagship model for complex reasoning, text and multi-turn chat.",
        "badge": "Popular"
    },
    {
        "id": "claude-3-5-sonnet",
        "name": "Claude 3.5 Sonnet",
        "provider": "Anthropic",
        "category": "Coding & Reasoning",
        "context_window": "200k tokens",
        "latency": "58ms",
        "cost_per_1k": 0.003,
        "description": "Industry benchmark in software engineering, architectural design and deep analysis.",
        "badge": "Best for Code"
    },
    {
        "id": "gemini-1-5-pro",
        "name": "Gemini 1.5 Pro",
        "provider": "Google",
        "category": "Ultra-Long Context",
        "context_window": "1M tokens",
        "latency": "62ms",
        "cost_per_1k": 0.0035,
        "description": "Massive context window capable of ingesting entire codebases and video streams.",
        "badge": "1M Context"
    },
    {
        "id": "llama-3-3-70b",
        "name": "Llama 3.3 (70B)",
        "provider": "Meta / Groq",
        "category": "Ultra-Fast Inference",
        "context_window": "128k tokens",
        "latency": "18ms",
        "cost_per_1k": 0.0008,
        "description": "Open weights powerhouse optimized for speed and cost-effective batch pipelines.",
        "badge": "Blazing Fast"
    },
    {
        "id": "dall-e-3",
        "name": "DALL-E 3 HD",
        "provider": "OpenAI",
        "category": "Image Generation",
        "context_window": "1024x1024",
        "latency": "320ms",
        "cost_per_1k": 0.040,
        "description": "High-fidelity photorealistic and artistic rendering with prompt accuracy.",
        "badge": "Image AI"
    },
    {
        "id": "whisper-v3",
        "name": "Whisper v3 Large",
        "provider": "OpenAI",
        "category": "Audio & Speech",
        "context_window": "Audio file",
        "latency": "85ms",
        "cost_per_1k": 0.006,
        "description": "State-of-the-art multilingual speech recognition and translation.",
        "badge": "Audio AI"
    }
]

class AIService:
    @staticmethod
    def get_models() -> List[Dict[str, Any]]:
        return AVAILABLE_MODELS

    @classmethod
    async def chat_completion(
        cls,
        model: str,
        messages: List[Dict[str, str]],
        temperature: float = 0.7,
        max_tokens: int = 1024
    ) -> Dict[str, Any]:
        start_time = time.time()
        
        # 1. Real OpenAI integration if OPENAI_API_KEY is configured
        if settings.OPENAI_API_KEY and model.startswith("gpt"):
            try:
                async with httpx.AsyncClient(timeout=30.0) as client:
                    resp = await client.post(
                        "https://api.openai.com/v1/chat/completions",
                        headers={
                            "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
                            "Content-Type": "application/json"
                        },
                        json={
                            "model": model,
                            "messages": messages,
                            "temperature": temperature,
                            "max_tokens": max_tokens
                        }
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        latency_ms = int((time.time() - start_time) * 1000)
                        return {
                            "id": data.get("id", f"gen-{int(time.time())}"),
                            "model": model,
                            "content": data["choices"][0]["message"]["content"],
                            "tokens_used": data.get("usage", {}).get("total_tokens", 350),
                            "latency_ms": latency_ms,
                            "finish_reason": "stop",
                            "created_at": datetime.datetime.utcnow().isoformat()
                        }
            except Exception as e:
                print(f"[AI Service] Real API call failed, falling back to mock engine: {e}")

        # 2. Smart Built-in Mock AI Engine
        last_user_message = next((m["content"] for m in reversed(messages) if m.get("role") == "user"), "Hello!")
        
        content = cls._generate_smart_response(last_user_message, model)
        latency_ms = random.randint(45, 120)
        tokens_est = len(content.split()) * 2 + 50
        
        return {
            "id": f"ai-saas-{random.randint(100000, 999999)}",
            "model": model,
            "content": content,
            "tokens_used": tokens_est,
            "latency_ms": latency_ms,
            "finish_reason": "stop",
            "created_at": datetime.datetime.utcnow().isoformat()
        }

    @classmethod
    async def chat_stream(
        cls,
        model: str,
        messages: List[Dict[str, str]],
        temperature: float = 0.7
    ) -> AsyncGenerator[str, None]:
        """Streams response tokens using Server-Sent Events (SSE) format"""
        last_user_message = next((m["content"] for m in reversed(messages) if m.get("role") == "user"), "Hello!")
        response_text = cls._generate_smart_response(last_user_message, model)
        
        words = response_text.split(" ")
        for i, word in enumerate(words):
            chunk = word + (" " if i < len(words) - 1 else "")
            payload = {
                "id": f"stream-{i}",
                "model": model,
                "delta": chunk,
                "done": False
            }
            yield f"data: {json.dumps(payload)}\n\n"
            await asyncio.sleep(random.uniform(0.015, 0.045))
        
        yield f"data: {json.dumps({'done': True, 'tokens_used': len(words) * 2})}\n\n"

    @classmethod
    async def generate_code(
        cls,
        language: str,
        prompt: str,
        model: str = "gpt-4o"
    ) -> Dict[str, Any]:
        start_time = time.time()
        lang_lower = language.lower()
        
        if "python" in lang_lower:
            code_body = (
                f"# Generated by {model} | Production Ready\n"
                "import asyncio\n"
                "from typing import Dict, Any, Optional\n\n"
                "class AIServicePipeline:\n"
                "    def __init__(self, api_key: str, timeout: int = 30):\n"
                "        self.api_key = api_key\n"
                "        self.timeout = timeout\n\n"
                f'    async def execute_task(self, prompt: str = "{prompt}") -> Dict[str, Any]:\n'
                '        """Executes asynchronous AI pipeline workflow."""\n'
                '        await asyncio.sleep(0.1)\n'
                "        return {\n"
                '            "status": "success",\n'
                f'            "model": "{model}",\n'
                f'            "prompt": "{prompt}",\n'
                '            "tokens_used": 340\n'
                "        }\n\n"
                'if __name__ == "__main__":\n'
                "    pipeline = AIServicePipeline(api_key='sk_live_demo')\n"
                "    res = asyncio.run(pipeline.execute_task())\n"
                "    print(res)\n"
            )
        elif "react" in lang_lower or "typescript" in lang_lower:
            code_body = (
                f"// Generated by {model} | React 18 TypeScript\n"
                "import React, { useState, useEffect } from 'react';\n"
                "import { Zap, Send } from 'lucide-react';\n\n"
                "export const AIStreamViewer: React.FC = () => {\n"
                f"  const [prompt, setPrompt] = useState('{prompt}');\n"
                "  const [output, setOutput] = useState('');\n"
                "  const [isStreaming, setIsStreaming] = useState(false);\n\n"
                "  const handleStream = async () => {\n"
                "    setIsStreaming(true);\n"
                "    const res = await fetch('/api/ai/stream', {\n"
                "      method: 'POST',\n"
                "      headers: { 'Content-Type': 'application/json' },\n"
                f"      body: JSON.stringify({{ model: '{model}', messages: [{{ role: 'user', content: prompt }}] }})\n"
                "    });\n"
                "    const reader = res.body?.getReader();\n"
                "    const decoder = new TextDecoder();\n"
                "    while (reader) {\n"
                "      const { done, value } = await reader.read();\n"
                "      if (done) break;\n"
                "      setOutput((prev) => prev + decoder.decode(value));\n"
                "    }\n"
                "    setIsStreaming(false);\n"
                "  };\n\n"
                "  return (\n"
                "    <div className='p-6 rounded-2xl bg-white/5 border border-white/10'>\n"
                "      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className='w-full p-3 bg-black/40 rounded-xl' />\n"
                "      <button onClick={handleStream} className='mt-3 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold'>Generate</button>\n"
                "      {output && <pre className='mt-4 p-4 bg-black/60 rounded-xl'>{output}</pre>}\n"
                "    </div>\n"
                "  );\n"
                "};\n"
            )
        else:
            code_body = (
                f"// Generated by {model} | {language}\n"
                f"// Prompt: {prompt}\n\n"
                f"async function runInference() {{\n"
                f"  console.log('Running {model} inference for: {prompt}');\n"
                f"  return {{ status: 'complete', engine: '{model}' }};\n"
                f"}}\n"
                f"export default runInference;\n"
            )

        latency_ms = int((time.time() - start_time) * 1000) + random.randint(40, 80)
        return {
            "id": f"code-{random.randint(1000, 9999)}",
            "model": model,
            "language": language,
            "code": code_body,
            "tokens_used": len(code_body.split()) * 2,
            "latency_ms": latency_ms,
            "created_at": datetime.datetime.utcnow().isoformat()
        }

    @classmethod
    async def generate_image(
        cls,
        prompt: str,
        model: str = "dall-e-3",
        size: str = "1024x1024",
        style: str = "vivid"
    ) -> Dict[str, Any]:
        curated_images = [
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1633493106185-5231c6a2cf75?auto=format&fit=crop&w=1200&q=80"
        ]
        chosen_img = random.choice(curated_images)
        return {
            "id": f"img-{random.randint(10000, 99999)}",
            "model": model,
            "prompt": prompt,
            "image_url": chosen_img,
            "size": size,
            "style": style,
            "created_at": datetime.datetime.utcnow().isoformat()
        }

    @staticmethod
    def _generate_smart_response(user_message: str, model: str) -> str:
        msg = user_message.lower()
        if "react" in msg or "hook" in msg:
            return (
                "Here is a production-grade React hook with TypeScript for streaming AI tokens:\n\n"
                "```tsx\n"
                "import { useState, useCallback } from 'react';\n\n"
                "export function useAIStream() {\n"
                "  const [data, setData] = useState<string>('');\n"
                "  const [isStreaming, setIsStreaming] = useState<boolean>(false);\n\n"
                f"  const generate = useCallback(async (prompt: string, model: string = '{model}') => {{\n"
                "    setData('');\n"
                "    setIsStreaming(true);\n"
                "    const res = await fetch('/api/ai/stream', {\n"
                "      method: 'POST',\n"
                "      headers: { 'Content-Type': 'application/json' },\n"
                "      body: JSON.stringify({ model, messages: [{ role: 'user', content: prompt }] })\n"
                "    });\n"
                "    const reader = res.body?.getReader();\n"
                "    const decoder = new TextDecoder();\n"
                "    while (reader) {\n"
                "      const { done, value } = await reader.read();\n"
                "      if (done) break;\n"
                "      setData((prev) => prev + decoder.decode(value));\n"
                "    }\n"
                "    setIsStreaming(false);\n"
                "  }, []);\n\n"
                "  return { data, isStreaming, generate };\n"
                "}\n"
                "```\n\n"
                "### Features:\n"
                "- Full TypeScript support\n"
                "- Decoupled streaming state\n"
                "- Zero external bundle overhead"
            )
        elif "pricing" in msg or "saas" in msg:
            return (
                f"### AI SaaS Monetization Strategy for {model}\n\n"
                "| Tier | Monthly Price | Included Tokens | Dedicated Models |\n"
                "| :--- | :--- | :--- | :--- |\n"
                "| **Starter** | **$19/mo** | 100,000 | GPT-3.5 & Llama 3 |\n"
                "| **Pro (Recommended)** | **$49/mo** | 500,000 | GPT-4o, Claude 3.5 & DALL-E 3 |\n"
                "| **Enterprise** | **$199/mo** | Unlimited | All Models + Dedicated SLA |\n\n"
                "#### Recommendations:\n"
                "1. Implement annual pricing with a 20% discount.\n"
                "2. Offer metered overage billing at $0.002 per 1k additional tokens."
            )
        else:
            return (
                f"### Analysis & Recommendations from {model}\n\n"
                f"I have analyzed your request: **\"{user_message[:60]}...\"**.\n\n"
                "1. **Scalable Architecture**: Use asynchronous FastAPI workers with JWT authentication.\n"
                "2. **API Key Security**: Use SHA-256 hashed keys with masked preview `sk_live_•••••••9f4a`.\n"
                f"3. **Inference Latency**: Estimated at ~45ms on {model}.\n\n"
                "Let me know if you need code generation, API schemas, or deployment configurations!"
            )
