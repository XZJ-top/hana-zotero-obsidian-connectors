"""Read-only MCP handshake and tool discovery; does not call library tools."""
import asyncio
import json
from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

async def main():
    params = StdioServerParameters(command="zotero-mcp", args=["serve"])
    async with stdio_client(params) as (read, write):
        async with ClientSession(read, write) as session:
            initialized = await session.initialize()
            tools = await session.list_tools()
            print(json.dumps({"initialize": "passed", "server": initialized.server_info.model_dump(), "toolCount": len(tools.tools), "toolNames": [tool.name for tool in tools.tools]}, ensure_ascii=False, indent=2))

asyncio.run(asyncio.wait_for(main(), timeout=45))
