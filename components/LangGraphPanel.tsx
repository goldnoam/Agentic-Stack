
import React, { useState } from 'react';

const LangGraphPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'graph' | 'tools' | 'api' | 'loop'>('graph');

  const snippets = {
    graph: `from langgraph.graph import StateGraph, END
from langgraph.prebuilt import ToolNode
from typing import TypedDict, Annotated, Sequence
import operator

# --- THE AGENT STATE ---
# TypedDict acts as the 'schema' for the graph's internal database.
class AgentState(TypedDict):
    # 'Annotated' allows us to attach metadata to the type.
    # 'operator.add' acts as a REDUCER: it tells LangGraph to
    # merge new node outputs by adding them to the existing list
    # instead of replacing the entire key.
    messages: Annotated[Sequence[BaseMessage], operator.add]

# --- TOOL INTEGRATION ---
tools = [web_scraper_tool, analytics_api_tool]
tool_node = ToolNode(tools)

workflow = StateGraph(AgentState)

# Define nodes: Brain (LLM) and Hands (Tools)
workflow.add_node("agent", call_model)
workflow.add_node("tools", tool_node)

workflow.set_entry_point("agent")

# Logic to determine if we need a tool or if we are done
workflow.add_conditional_edges(
    "agent",
    should_continue, # Checks for presence of 'tool_calls'
    {"tools": "tools", END: END}
)

# After tool execution, always return to the agent
workflow.add_edge("tools", "agent")

app = workflow.compile()`,
    tools: `from langchain_core.tools import tool
import httpx
from bs4 import BeautifulSoup

@tool
async def web_scraper_tool(url: str):
    """Scrapes and cleans HTML content from a website."""
    async with httpx.AsyncClient() as client:
        response = await client.get(url, timeout=10.0)
        soup = BeautifulSoup(response.text, "html.parser")
        return soup.get_text()[:1500] # Return sanitized snippet

@tool
def analytics_api_tool(query: str):
    """Fetches internal business metrics via private API."""
    # Simulation of authenticated API call
    return {"status": "success", "metric": 42.5, "unit": "ms"}

# Bind tools to a model like Gemini or GPT-4o
from langchain_openai import ChatOpenAI
model = ChatOpenAI(model="gpt-4o").bind_tools([web_scraper_tool, analytics_api_tool])`,
    api: `from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from app.agent import agent_app # Compiled LangGraph
import json

app = FastAPI(title="Agentic Stack API")

class ChatRequest(BaseModel):
    message: str
    thread_id: str # Crucial for state persistence

@app.post("/agent/chat")
async def chat_with_agent(request: ChatRequest):
    # Config enables LangGraph checkpointing (State Persistence)
    config = {"configurable": {"thread_id": request.thread_id}}
    
    async def event_generator():
        # Stream events from the graph (Node transitions, tool starts, etc.)
        async for event in agent_app.astream_events(
            {"messages": [("user", request.message)]}, 
            config, 
            version="v2"
        ):
            kind = event["event"]
            if kind == "on_chat_model_stream":
                content = event["data"]["chunk"].content
                if content:
                    yield f"data: {json.dumps({'type': 'token', 'content': content})}\\n\\n"
            elif kind == "on_tool_start":
                yield f"data: {json.dumps({'type': 'tool', 'name': event['name']})}\\n\\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")`,
    loop: `from langgraph.graph import StateGraph, END

# Define a supervisor that routes work to specialized agents
def supervisor_node(state):
    # Logic to decide: "researcher", "coder", or "FINISH"
    return {"next_agent": decision}

workflow = StateGraph(AgentState)

workflow.add_node("supervisor", supervisor_node)
workflow.add_node("researcher", researcher_agent)
workflow.add_node("coder", coder_agent)

# Entry point is the manager
workflow.set_entry_point("supervisor")

# Routing logic using conditional edges
workflow.add_conditional_edges(
    "supervisor",
    lambda x: x["next_agent"],
    {
        "researcher": "researcher",
        "coder": "coder",
        "FINISH": END
    }
)

# Workers report back to the supervisor
workflow.add_edge("researcher", "supervisor")
workflow.add_edge("coder", "supervisor")

app = workflow.compile()`
  };

  return (
    <div className="space-y-12 py-10">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-lg text-purple-400 text-xs font-bold uppercase tracking-wider">
            Engine Architecture
          </div>
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Stateful Agentic Workflows
          </h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            LangGraph transforms LLMs from passive predictors into active decision-makers. 
            By using <strong>ToolNode</strong> and <strong>FastAPI</strong>, you create a bridge 
            between raw model reasoning and real-world execution.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl group hover:border-purple-500/50 transition-colors">
              <h4 className="text-purple-400 font-bold mb-1 italic">Bridge to Reality</h4>
              <p className="text-xs text-slate-500">FastAPI endpoints handle auth and serialization while the graph manages logic.</p>
            </div>
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl group hover:border-pink-500/50 transition-colors">
              <h4 className="text-pink-400 font-bold mb-1 italic">Agentic Loops</h4>
              <p className="text-xs text-slate-500">Implement multi-agent systems where workers report to a central supervisor.</p>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
          <div className="flex border-b border-slate-800 bg-slate-950/50 p-1">
            {['graph', 'tools', 'api', 'loop'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 text-xs font-mono transition-all rounded-md ${
                  activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab === 'graph' ? 'Workflow' : tab === 'tools' ? 'Tools' : tab === 'api' ? 'FastAPI' : 'Multi-Agent Loop'}
              </button>
            ))}
          </div>
          <div className="p-6 overflow-hidden">
            <pre className="text-sm code-font overflow-x-auto text-indigo-100/80 max-h-[400px]">
              {snippets[activeTab]}
            </pre>
            
            {activeTab === 'graph' && (
              <div className="mt-6 p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-xl space-y-4">
                <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></span>
                  Concept Breakdown: State Management
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-400 leading-relaxed">
                  <div className="space-y-2">
                    <strong className="text-slate-200 block">AgentState (TypedDict)</strong>
                    <p>
                      This is the graph's schema. It defines what data is available to nodes. In a conversation, the state usually contains a list of messages. Using a TypedDict allows for static type checking across your agent's reasoning chain.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <strong className="text-slate-200 block">Reducers (Annotated + operator.add)</strong>
                    <p>
                      By default, a node overwrites its key in the state. <code>Annotated[T, operator.add]</code> specifies a "reducer" function. It tells LangGraph: "When a node returns a list of messages, don't replace the history—append to it." This is how context is preserved through cyclic loops.
                    </p>
                  </div>
                  <div className="col-span-1 md:col-span-2 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                    <strong className="text-slate-200 block mb-1">ToolNode Functionality</strong>
                    <p>
                      ToolNode acts as a automated execution layer. When your LLM outputs <code>tool_calls</code>, the ToolNode intercepts them, executes the corresponding Python functions, and automatically appends the results (ToolMessages) to your State, allowing the model to see the output in the next cycle.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LangGraphPanel;
