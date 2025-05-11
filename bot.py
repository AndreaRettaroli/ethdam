# import os
# from dotenv import load_dotenv
# from telegram import Update
# from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes
# from agents import Agent, Runner, trace
# from agents.mcp import MCPServer, MCPServerStdio

# load_dotenv()


# async def init_server():
#     samples_dir = os.path.join(os.path.dirname(__file__), "mcp/index.js")
#     # "command": "node",
#     #   "args": [
#     #     "/Users/andrea.rettaroli/ethdam/mcp/index.js"
#     #   ],
#     async with MCPServerStdio(
#         params={
#             "command": "npx",
#             "args": ["-y", "@modelcontextprotocol/server-filesystem", samples_dir],
#         }
#     ) as server:
#         tools = await server.list_tools()
#         return tools


# async def hello(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
#     await update.message.reply_text(f"Hello {update.effective_user.first_name}")


# app = ApplicationBuilder().token(os.getenv("TOKEN")).build()

# app.add_handler(CommandHandler("hello", hello))

# app.run_polling()


import asyncio
import os
import shutil

from agents import Agent, Runner, trace
from agents.mcp import MCPServer, MCPServerStdio


async def run(mcp_server: MCPServer):
    agent = Agent(
        name="Assistant",
        instructions=f"Answer questions about the weather",
        mcp_servers=[mcp_server],
    )

    message = "what is the weather in New York?"
    print("\n" + "-" * 40)
    print(f"Running: {message}")
    result = await Runner.run(starting_agent=agent, input=message)
    print(result.final_output)


async def main():
    # Ask the user for the directory path
    # directory_path = input("Please enter the path to the git repository: ")

    samples_dir = os.path.join(os.path.dirname(__file__), "mcp/index.js")
    async with MCPServerStdio(
        cache_tools_list=True,  # Cache the tools list, for demonstration
        # "command": "node",
        #   "args": [
        #     "/Users/andrea.rettaroli/ethdam/mcp/index.js"
        #   ],
        params={
            "command": "node",
            "args": ["/Users/andrea.rettaroli/ethdam/mcp/index.js"],
        },
    ) as server:
        tools = await server.list_tools()
        print(f"Tools: {len(tools)}")
        for tool in tools:
            print(f"Tool: {tool.name} - {tool.description}")

        with trace(workflow_name="MCP weather Example"):
            await run(server)


if __name__ == "__main__":
    asyncio.run(main())
