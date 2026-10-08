# MiniMax M Plan 查询工具

专为 MiniMax M Plan 设计的轻量用量看板，实时查看套餐已使用额度、剩余额度、双周期重置倒计时。

## 核心特性

- **双周期监控**：实时查看 5 小时与周度额度余量及重置倒计时。
- **对齐官方**：展示数据与 MiniMax 官方控制台严格一致，无取整视差。
- **共享额度**：多模型共用统一配额池，无需手动拆分计算。
- **模型支持**：即时展示当前订阅套餐支持的全部可用模型。
- **原始数据**：支持一键展开核验官方接口返回的原始 JSON。
- **安全无留存**：Key 仅保存在浏览器会话，不设后端数据库，关页即销毁。
- **流畅交互**：硬件加速渲染进度条，全站符合 WCAG AA 对比度规范。

## 本地开发

### 环境要求
- Node.js >= 22.x
- npm >= 9.x

### 安装与启动
```bash
# 安装依赖
npm install

# 本地联调（同时启动前端 3001 端口与 API 3000 端口）
npm run dev
```

- 前端：http://localhost:3001
- API：http://localhost:3000

### 验证
```bash
npm test
npm run build
```

## 一键部署

### Vercel
1. Fork 本仓库至 GitHub；
2. 在 Vercel 控制台导入仓库；
3. 点击 Deploy 即刻上线（自动通过 vercel.json 托管 API）。

### Netlify
1. Fork 本仓库至 GitHub；
2. 在 Netlify 控制台导入仓库；
3. 构建配置自动读取 netlify.toml，点击 Deploy 即刻上线。

## 获取 API Key

1. 登录 [MiniMax 开放平台控制台](https://platform.minimax.cn/)；
2. 进入控制台 -> 套餐详情 / 订阅管理；
3. 复制专属订阅 API Key（通常以 sk- 或 sk-cp- 开头）；
4. 在查询页输入 Key 查询即可。

注意：本工具专为 MiniMax M Plan 订阅 Key 设计，普通按量计费 Key 不消耗此配额；如遇 1004 报错请确认 Key 是否来自国内开放平台。

## 开源协议

本项目基于 [MIT License](./LICENSE) 开源。
