# MiniMax Token Plan 用量查询

MiniMax Token Plan 专属查询工具，实时查看已使用额度、剩余额度与各模型消耗明细。

## 功能特性

- 实时查询 Token Plan 已使用额度与剩余额度
- 当前窗口与本周用量双视角查看
- 模型级用量明细，清晰定位消耗来源
- 移动端自适应卡片布局
- 原始响应数据核对
- 隐私友好 - API Key 仅用于本次查询，不留存

## 本地开发

```bash
npm install
npm run dev
```

自动启动：
- 前端：http://localhost:3001
- API: http://localhost:3000

## 验证

```bash
npm test
npm run build
```

## 一键部署

### Vercel

1. Fork 此仓库
2. 登录 [Vercel](https://vercel.com)
3. Import 项目 → 选择仓库
4. Deploy！

### Netlify

1. Fork 此仓库
2. 登录 [Netlify](https://netlify.com)
3. Import 项目 → 选择仓库
4. Deploy！

部署后直接访问域名即可使用，无需配置任何环境变量。

如果部署后点击查询没有进入结果态，优先检查：
- 浏览器 `Network` 是否发出了 `POST /api/remains`
- Netlify deploy log 是否成功打包了 `remains` function
- 页面是否正常加载了 `_nuxt` 下的前端脚本资源

## 获取 API Key

1. 登录 [MiniMax 开放平台](https://platform.minimaxi.com/)
2. 进入控制台 → API Key 管理
3. 生成或查看 API Key

**注意**: 本工具仅支持查询 MiniMax Token Plan 的用量，请确认你已开通该服务。

## License

MIT
