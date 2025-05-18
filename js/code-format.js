/**
 * Code formatting script for the PHP Interactive Guide
 * Improves the visual formatting of code examples to match the style across all pages
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find all code blocks in the page
    const codeBlocks = document.querySelectorAll('.vscode-editor');
    
    // Process each code block and convert to the standard format
    codeBlocks.forEach(function(codeBlock, index) {
        // Skip blocks that are already properly formatted
        if (codeBlock.querySelector('.vscode-editor-header') && 
            codeBlock.querySelector('.vscode-editor-footer')) {
            return;
        }
        
        // Get the existing content
        const content = codeBlock.innerHTML;
        const existingCode = content.match(/<pre><code.*?>([\s\S]*?)<\/code><\/pre>/i);
        
        if (existingCode && existingCode[1]) {
            // Extract the language
            let language = 'php';
            const langMatch = content.match(/language-(\w+)/i);
            if (langMatch && langMatch[1]) {
                language = langMatch[1];
            }
            
            // Create a filename based on the language and index
            let filename = 'ejemplo.php';
            if (language === 'json') {
                filename = 'data.json';
            } else if (language === 'curl') {
                filename = 'curl_request.php';
            } else if (content.includes('POST con JSON')) {
                filename = 'post_request.php';
            } else if (content.includes('Usando cURL')) {
                filename = 'curl_request.php';
            } else if (content.includes('Petición Simple')) {
                filename = 'simple_request.php';
            }
            
            // Clean up the code
            let code = existingCode[1];
            
            // Remove the vscode-editor-content span wrapper if it exists
            code = code.replace(/<span class="vscode-editor-content">([\s\S]*?)<\/span>/g, '$1');
            
            // Create the standardized format
            const newHtml = `
                <div class="vscode-editor-header bg-dark text-white d-flex justify-content-between align-items-center px-3 py-2">
                    <span><i class="fab fa-${language === 'json' ? 'js' : 'php'}"></i> ${filename}</span>
                </div>
                <div class="vscode-editor-content">
                    <pre><code class="${language}">
${code}
                    </code></pre>
                </div>
                <div class="vscode-editor-footer bg-dark text-white px-3 py-1">
                    <span>${language === 'json' ? 'JSON' : 'PHP 8.2'}</span>
                </div>
            `;
            
            // Replace the content
            codeBlock.innerHTML = newHtml;
        }
    });
    
    // Apply standard styling to all code blocks
    document.querySelectorAll('.vscode-editor-content').forEach(function(el) {
        el.style.backgroundColor = '#1E1E1E';
        el.style.color = '#D4D4D4';
        el.style.fontFamily = 'Consolas, Monaco, monospace';
        el.style.fontSize = '0.9rem';
        el.style.lineHeight = '1.5';
        el.style.padding = '12px';
        el.style.borderRadius = '0';
    });
    
    // Make sure code within content is properly styled
    document.querySelectorAll('.vscode-editor pre').forEach(function(pre) {
        pre.style.margin = '0';
        pre.style.background = 'transparent';
    });
    
    document.querySelectorAll('.vscode-editor code').forEach(function(code) {
        code.style.background = 'transparent';
        code.style.padding = '0';
    });
    
    // Fix tab navigation for code examples
    document.querySelectorAll('button[data-bs-toggle="tab"]').forEach(function(tabBtn) {
        tabBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = tabBtn.getAttribute('data-bs-target');
            const targetPane = document.querySelector(targetId);
            
            if (targetPane) {
                // Find the parent tab content container
                const tabContent = tabBtn.closest('.nav').nextElementSibling;
                if (tabContent && tabContent.classList.contains('tab-content')) {
                    // Hide all sibling tab panes
                    const allPanes = tabContent.querySelectorAll('.tab-pane');
                    allPanes.forEach(function(pane) {
                        pane.classList.remove('active', 'show');
                    });
                    
                    // Show the target pane
                    targetPane.classList.add('active', 'show');
                }
                
                // Update the tab button states
                const tabBtnContainer = tabBtn.closest('.nav');
                if (tabBtnContainer) {
                    const allTabs = tabBtnContainer.querySelectorAll('button[data-bs-toggle="tab"]');
                    allTabs.forEach(function(tab) {
                        tab.classList.remove('active');
                        tab.setAttribute('aria-selected', 'false');
                    });
                    
                    tabBtn.classList.add('active');
                    tabBtn.setAttribute('aria-selected', 'true');
                }
            }
        });
    });
});
