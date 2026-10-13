# Hana Zotero & Obsidian Local MCP Connectors

两个适配 Hana 1.1.0-beta 的原生 MCP connector。它们使用现有服务，不内置服务器，不自动下载或更新软件，不包含任何 API key。

## Zotero

`zotero/connector.json` 使用 stdio 启动 `zotero-mcp serve`。先安装 [Zotero MCP server](https://pypi.org/project/zotero-mcp-server/) 并配置其 Zotero 数据来源。本机已验证版本 0.14.1。

Hana server 的 PATH 必须能找到 `zotero-mcp`。若桌面启动器继承的 PATH 不含安装目录，在 Hana 连接器设置中将 command 改为自己的绝对路径。不要照抄作者的个人目录。

安装后，Hana 可发现搜索、文献元数据、批注和其他上游工具。工具清单也包含修改和删除操作；包不授予自动执行权限，保留 Hana 默认审核策略。握手成功不代表所有工具已通过功能测试。云端 Zotero、语义检索或批处理涉及的外部服务取决于用户的上游配置。

## Obsidian

`obsidian/connector.json` 连接 `https://127.0.0.1:27124/mcp/`，使用 Bearer credential。

1. 在 Obsidian 安装并启用 [Local REST API with MCP](https://github.com/coddingtonbear/obsidian-local-rest-api)，本机检查版本 5.4.0。
2. 在 Hana 安装 connector，然后在连接器详情页填写插件设置中显示的 API Key。不要在聊天、仓库或安装包中填写密钥。
3. 保持 Obsidian 开启。若更改 HTTPS 端口，在 Hana 中修改连接器 URL。
4. 若 Hana 报证书错误，先导出并核验插件 CA。此版 connector schema 没有按连接器指定 CA 的字段。Node 常见做法是通过 `NODE_EXTRA_CA_CERTS` 指向 CA PEM 文件，并在 Hana server 启动前设置环境，完全重启后实际测试。仅在 Windows 信任库导入 CA 是否足够取决于运行时启动参数；不可据此保证连接成功。包不会自动安装证书或修改系统环境。

始终验证 HTTPS，不设置 `NODE_TLS_REJECT_UNAUTHORIZED=0`。本机当前状态为 `needs-auth`，尚未填写密钥，因此未完成已认证的 MCP 握手或任何笔记读写测试。

连接器直接暴露上游能力，不自动同步笔记，也不强制保护手写区块。需要同步时，应另行编排仅修改 `zotero:managed` 区块的工作流。

## 安装与构建

本地 JSON 通过 Hana 正式扩展入口安装；发布 ZIP 使用 Hana 市集/扩展安装入口。

使用 Hana checkout 或已安装的 server artifact 自带官方打包器：

```sh
node build-local.mjs /path/to/hana
```

输出 `dist/connector-*-1.0.1.entry.json` 与匹配的 ZIP。发布者为 XZJ（GitHub: XZJ-top）。正式 Release 同时上传这四份产物，每项 connector 分别向 hana-marketplace 提交登记 PR。

## 图标与声明

图标直接来自各软件官网，出处记录在 `icons-sources.json`。Zotero、Obsidian 的名称、商标和图标归各自权利人所有，仅用于识别连接对象。此项目是第三方适配包，未经 Zotero、Obsidian 官方背书。项目自编代码及文档适用 MIT，软件图标不包含在该许可授权内。

具体测试范围见 [TEST-REPORT.md](TEST-REPORT.md)。
