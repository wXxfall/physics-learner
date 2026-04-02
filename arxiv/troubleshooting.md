# arXiv Beautifier 故障排查指南

## 问题描述
在Chrome浏览器中安装扩展后，没有出现预期的界面变化。

## 排查步骤

### 步骤1: 检查扩展安装状态
1. 打开Chrome浏览器
2. 访问 `chrome://extensions/`
3. 确认 "arXiv Beautifier" 扩展显示为 "已启用" 状态
4. 如果扩展未启用，点击 "启用" 按钮

### 步骤2: 验证Manifest配置
1. 检查 `manifest.json` 文件是否符合Chrome扩展要求
2. 确认 `matches` 字段包含正确的URL模式：`["*://arxiv.org/*"]`
3. 确认 `manifest_version` 为 3

### 步骤3: 检查浏览器控制台错误
1. 访问 [arXiv 网站](https://arxiv.org)
2. 按 `F12` 打开开发者工具
3. 切换到 "控制台" 选项卡
4. 查看是否有任何错误信息
5. 记录所有与 "arXiv Beautifier" 相关的错误

### 步骤4: 验证内容脚本注入
1. 在开发者工具中，切换到 "Sources" 选项卡
2. 展开 "Content Scripts" 部分
3. 确认能看到 `content.js` 文件
4. 在 `content.js` 中设置断点，检查是否执行

### 步骤5: 测试权限
1. 检查扩展是否有权限在 arXiv 网站上运行
2. 在扩展管理页面，点击 "详情" 查看权限设置
3. 确认 "网站访问" 权限已授予

## 常见问题及解决方案

### 问题1: 内容脚本未注入
**症状**：控制台无任何扩展相关信息
**解决方案**：
- 确认 `matches` 模式正确
- 检查扩展是否已启用
- 尝试重新加载扩展

### 问题2: DOM操作错误
**症状**：控制台显示 "无法找到页面主体元素" 错误
**解决方案**：
- 检查 arXiv 网站结构是否发生变化
- 修改 `content.js` 中的选择器

### 问题3: 样式未应用
**症状**：页面结构变化但样式未生效
**解决方案**：
- 检查 `styles.css` 是否正确加载
- 检查CSS选择器是否匹配
- 清除浏览器缓存

### 问题4: 权限问题
**症状**：扩展无法访问页面
**解决方案**：
- 确认扩展已授予 `activeTab` 权限
- 检查Chrome版本是否支持Manifest V3

## 测试脚本

### 手动测试步骤
1. 打开Chrome浏览器
2. 访问 `chrome://extensions/`
3. 启用 "开发者模式"
4. 点击 "加载已解压的扩展程序"
5. 选择 `arxiv` 文件夹
6. 访问 [arXiv 网站](https://arxiv.org)
7. 打开开发者工具，查看控制台输出

### 控制台预期输出
如果扩展正常工作，控制台应该显示：
```
arXiv Beautifier 已成功应用
实时同步已启动
arXiv Beautifier 加载完成
```

### 诊断命令
在浏览器控制台中运行以下命令来测试扩展状态：

```javascript
// 检查扩展是否已加载
console.log('arXiv Beautifier 测试');

// 检查美化容器是否创建
const container = document.getElementById('arxiv-beautified');
console.log('美化容器:', container);

// 检查样式是否应用
const styleSheets = document.styleSheets;
console.log('样式表数量:', styleSheets.length);

// 检查内容脚本是否执行
console.log('内容脚本执行时间:', new Date().toLocaleString());
```

## 技术分析

### 可能的代码问题
1. **DOM选择器错误**：arXiv网站结构可能已变化
2. **执行时机问题**：`document_end` 可能过早，页面结构尚未完全加载
3. **权限不足**：扩展可能缺少必要的权限
4. **Chrome版本兼容性**：Manifest V3 可能在旧版Chrome中不被支持

### 代码优化建议
1. **增强错误处理**：添加更详细的错误日志
2. **改进选择器**：使用更稳健的DOM选择方法
3. **延迟执行**：增加页面加载完成的检测
4. **权限优化**：确保扩展有足够的权限

## 版本兼容性

### 支持的Chrome版本
- Chrome 88+（完全支持Manifest V3）
- Chrome 80-87（部分支持，可能需要调整）

### 降级方案
如果使用旧版Chrome，可以考虑：
1. 将 `manifest_version` 改为 2
2. 调整权限声明格式
3. 简化内容脚本逻辑

## 重新安装步骤

1. 从扩展管理页面移除当前扩展
2. 关闭并重新打开Chrome
3. 重新加载扩展
4. 清除浏览器缓存
5. 访问 arXiv 网站测试

## 联系支持

如果问题仍然存在，请提供以下信息：
1. Chrome浏览器版本
2. 控制台错误截图
3. 扩展管理页面截图
4. arXiv网站加载时的控制台输出

---

**注意**：此扩展仅在 arXiv 网站上生效，不会影响其他网站。