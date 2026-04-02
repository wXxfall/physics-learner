// arXiv Beautifier - 美化arXiv网站界面
// 版本: 1.0.0
// 作者: PhysicsLearner

// 错误处理函数
function handleError(error) {
    console.error('arXiv Beautifier 错误:', error);
    // 显示错误通知
    showNotification('arXiv Beautifier 错误: ' + error.message, 'error');
}

// 显示通知
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-family: Arial, sans-serif;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#3498db';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 3秒后移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 添加动画样式
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// 等待页面加载完成
function initExtension() {
    try {
        console.log('arXiv Beautifier 初始化开始');
        
        // 检查是否已经应用了美化
        if (document.getElementById('arxiv-beautified')) {
            console.log('arXiv Beautifier 已应用');
            return;
        }

        // 注入美化容器
        const body = document.querySelector('body');
        if (!body) {
            throw new Error('无法找到页面主体元素');
        }

        // 创建美化容器
        const beautifiedContainer = document.createElement('div');
        beautifiedContainer.id = 'arxiv-beautified';
        
        // 复制原始内容（使用更安全的方式）
        while (body.firstChild) {
            beautifiedContainer.appendChild(body.firstChild);
        }
        
        // 添加美化容器
        body.appendChild(beautifiedContainer);

        console.log('arXiv Beautifier 已成功应用');
        showNotification('arXiv Beautifier 已成功应用', 'info');

        // 初始化实时同步
        initRealTimeSync();

        // 应用额外的美化处理
        applyAdditionalBeautification();

    } catch (error) {
        handleError(error);
    }
}

// 确保页面完全加载
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initExtension);
} else {
    // 页面已经加载完成，直接初始化
    initExtension();
}

// 页面完全加载后再次检查
window.addEventListener('load', function() {
    console.log('页面完全加载，再次检查扩展状态');
    setTimeout(applyAdditionalBeautification, 1000);
});

// 初始化实时同步
function initRealTimeSync() {
    try {
        // 使用MutationObserver监听DOM变化
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // 处理DOM变化
                handleDomChange(mutation);
            });
        });

        // 配置观察选项
        const observerOptions = {
            childList: true,
            subtree: true,
            attributes: true,
            characterData: true
        };

        // 开始观察
        const targetNode = document.getElementById('arxiv-beautified');
        if (targetNode) {
            observer.observe(targetNode, observerOptions);
            console.log('实时同步已启动');
        } else {
            console.warn('未找到美化容器，无法启动实时同步');
        }

    } catch (error) {
        handleError(error);
    }
}

// 处理DOM变化
function handleDomChange(mutation) {
    try {
        // 这里可以添加具体的DOM变化处理逻辑
        // 例如：更新美化元素、重新应用样式等
        
        // 示例：当新内容加载时，重新应用美化
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // 延迟执行，确保内容完全加载
            setTimeout(function() {
                applyAdditionalBeautification();
            }, 100);
        }

    } catch (error) {
        handleError(error);
    }
}

// 应用额外的美化处理
function applyAdditionalBeautification() {
    try {
        console.log('应用额外的美化处理');
        
        // 美化论文列表
        beautifyPaperList();

        // 美化论文详情页
        beautifyPaperDetail();

        // 美化搜索结果
        beautifySearchResults();

        // 美化导航栏
        beautifyNavigation();
        
        // 美化页脚
        beautifyFooter();

        console.log('arXiv Beautifier 加载完成');
        
    } catch (error) {
        handleError(error);
    }
}

// 美化论文列表
function beautifyPaperList() {
    try {
        const paperEntries = document.querySelectorAll('.arxiv-result, .list-identifier, .entry');
        console.log('找到论文条目数量:', paperEntries.length);
        
        paperEntries.forEach(function(entry) {
            // 添加美化类
            entry.classList.add('beautified-paper-entry');
        });
    } catch (error) {
        handleError(error);
    }
}

// 美化论文详情页
function beautifyPaperDetail() {
    try {
        const paperDetail = document.querySelector('.abs, .abstract');
        if (paperDetail) {
            console.log('找到论文详情页');
            paperDetail.classList.add('beautified-paper-detail');
        } else {
            console.log('未找到论文详情页');
        }
    } catch (error) {
        handleError(error);
    }
}

// 美化搜索结果
function beautifySearchResults() {
    try {
        const searchResults = document.querySelector('.search-results, .results');
        if (searchResults) {
            console.log('找到搜索结果');
            searchResults.classList.add('beautified-search-results');
        } else {
            console.log('未找到搜索结果');
        }
    } catch (error) {
        handleError(error);
    }
}

// 美化导航栏
function beautifyNavigation() {
    try {
        const navigation = document.querySelector('nav, .navbar, .header');
        if (navigation) {
            console.log('找到导航栏');
            navigation.classList.add('beautified-navigation');
        }
    } catch (error) {
        handleError(error);
    }
}

// 美化页脚
function beautifyFooter() {
    try {
        const footer = document.querySelector('footer, .footer');
        if (footer) {
            console.log('找到页脚');
            footer.classList.add('beautified-footer');
        }
    } catch (error) {
        handleError(error);
    }
}

// 初始化动画样式
addAnimationStyles();