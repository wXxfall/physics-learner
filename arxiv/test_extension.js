// arXiv Beautifier 测试脚本
// 用于诊断扩展是否正常工作

// 测试步骤：
// 1. 在Chrome浏览器中打开 arXiv 网站
// 2. 打开开发者工具（F12）
// 3. 切换到控制台选项卡
// 4. 复制并粘贴此脚本到控制台中运行

(function() {
    console.log('=== arXiv Beautifier 测试脚本 ===');
    
    // 1. 检查扩展是否加载
    console.log('\n1. 检查扩展加载状态:');
    
    // 检查美化容器是否存在
    const container = document.getElementById('arxiv-beautified');
    if (container) {
        console.log('✓ 美化容器已创建:', container);
    } else {
        console.log('✗ 美化容器未创建');
    }
    
    // 2. 检查样式是否加载
    console.log('\n2. 检查样式加载状态:');
    const styleSheets = document.styleSheets;
    let cssLoaded = false;
    
    for (let i = 0; i < styleSheets.length; i++) {
        const sheet = styleSheets[i];
        try {
            if (sheet.href && sheet.href.includes('styles.css')) {
                console.log('✓ 样式表已加载:', sheet.href);
                cssLoaded = true;
                break;
            }
        } catch (e) {
            // 跨域样式表可能会抛出异常
        }
    }
    
    if (!cssLoaded) {
        console.log('✗ 样式表未加载');
    }
    
    // 3. 检查控制台日志
    console.log('\n3. 检查控制台日志:');
    console.log('请查看控制台中是否有 "arXiv Beautifier 已成功应用" 等相关日志');
    
    // 4. 检查DOM结构
    console.log('\n4. 检查DOM结构:');
    console.log('页面标题:', document.title);
    console.log('Body元素:', document.body);
    console.log('Body子元素数量:', document.body.children.length);
    
    // 5. 检查扩展功能
    console.log('\n5. 测试扩展功能:');
    
    // 测试论文列表美化
    const paperEntries = document.querySelectorAll('.arxiv-result, .list-identifier, .entry');
    console.log('找到论文条目数量:', paperEntries.length);
    
    // 测试论文详情页美化
    const paperDetail = document.querySelector('.abs, .abstract');
    if (paperDetail) {
        console.log('✓ 找到论文详情页');
    } else {
        console.log('✗ 未找到论文详情页');
    }
    
    // 6. 测试权限
    console.log('\n6. 检查权限:');
    console.log('当前URL:', window.location.href);
    console.log('是否为arXiv网站:', window.location.hostname.includes('arxiv.org'));
    
    // 7. 显示诊断结果
    console.log('\n=== 诊断结果 ===');
    
    if (container && cssLoaded) {
        console.log('✓ 扩展已成功加载并运行');
        console.log('✓ 美化容器已创建');
        console.log('✓ 样式已加载');
    } else {
        console.log('✗ 扩展未正常运行');
        if (!container) {
            console.log('  - 原因: 美化容器未创建');
        }
        if (!cssLoaded) {
            console.log('  - 原因: 样式未加载');
        }
    }
    
    // 8. 提供解决方案
    console.log('\n=== 解决方案 ===');
    console.log('1. 确保扩展已在 chrome://extensions/ 中启用');
    console.log('2. 刷新 arXiv 页面');
    console.log('3. 检查网络连接是否正常');
    console.log('4. 尝试重新加载扩展');
    console.log('5. 查看控制台是否有错误信息');
    
    console.log('\n=== 测试完成 ===');
})();

// 额外的诊断工具
function checkExtensionStatus() {
    console.log('\n=== 扩展状态检查 ===');
    
    // 检查扩展是否注入
    console.log('内容脚本执行时间:', new Date().toLocaleString());
    
    // 检查DOM操作是否成功
    const body = document.querySelector('body');
    console.log('Body元素存在:', !!body);
    
    // 检查美化容器
    const container = document.getElementById('arxiv-beautified');
    console.log('美化容器存在:', !!container);
    if (container) {
        console.log('美化容器子元素数量:', container.children.length);
    }
    
    // 检查事件监听器
    console.log('DOMContentLoaded 事件已触发:', document.readyState !== 'loading');
    console.log('页面加载状态:', document.readyState);
}

// 运行额外检查
checkExtensionStatus();