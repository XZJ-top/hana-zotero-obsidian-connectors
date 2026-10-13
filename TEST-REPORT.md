# 自测报告

- Hana: 安装环境 server artifact 1.1.0-beta。
- OS: Windows NT 10.0.26300。
- Zotero MCP: 0.14.1；Obsidian Local REST API with MCP: 5.4.0。
- 1.0.0 JSON 已通过正式 extension_manager 流程安装。1.0.1 加入官方图标，使用同一 manifest/schema；Release 远程安装尚未测试。

## 实际结果

1. 当前 Hana 官方 extension-pack 已成功打包两项 1.0.0，输出 entry 与 ZIP。
2. Zotero version/help 正常。
3. 独立 SDK probe 的 initialize 和 tools/list 成功，发现 41 个工具。未调用写入或删除工具，也未执行文献功能回归。
4. Hana 运行时状态：zotero enabled=true, status=running, toolCount=41, error为空, collisions=[]。
5. Obsidian HTTPS 根端点返回 status=OK。connector 已安装，Hana 报 needs-auth/authStatus=missing/toolCount=0。尚未填写 API key；已认证 handshake、tools/list、笔记读写均未测试。
6. 图标来源为 Zotero 官方品牌页与 Obsidian 官网 apple-touch-icon。

## 限制

- 需要用户预装并配置上游服务。Zotero command 依赖 Hana 的 PATH；可在连接器设置中改为本机绝对路径。
- Obsidian 需用户在 Hana 填写 API key。若后续出现自签 CA 错误，需要运行时信任配置，此包不改环境或关闭 TLS 校验。
- 没有自动同步工作流；不保证每个上游工具的实际业务行为。
- 发布包不含凭据，不声明自动放行工具权限。上游写入/删除能力仍需要 Hana 审核。
