import React, { useState } from 'react';
import { BookOpenIcon, KeyIcon, CpuIcon, PlayIcon } from './components/Icons';
import LivePlayground from './components/LivePlayground';
import { Step } from './types';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('intro');

  const steps: Step[] = [
    {
      id: 'intro',
      title: '1. 什么是 AI Studio?',
      icon: BookOpenIcon,
      content: (
        <div className="space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">欢迎使用 Google AI Studio</h2>
          <p>
            <strong>Google AI Studio</strong> 是一个基于 Web 的快速原型设计工具。它就像是开发者的"游乐场"，让你可以直接与 Google 最先进的 Gemini 模型进行交互。
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">适合人群</h4>
              <p className="text-sm">开发者、学生、AI 爱好者。不需要复杂的代码环境，打开浏览器即可使用。</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
              <h4 className="font-semibold text-green-800 mb-2">核心功能</h4>
              <p className="text-sm">测试提示词 (Prompts)、调整模型参数、导出代码 (Python/JS/cURL)。</p>
            </div>
          </div>
          <p>
            在本教程中，我们将带你了解如何注册、获取密钥，并最终在模拟环境中运行你的第一个 AI 提示词。
          </p>
        </div>
      )
    },
    {
      id: 'apikey',
      title: '2. 获取 API 密钥',
      icon: KeyIcon,
      content: (
        <div className="space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">关键的第一步：API Key</h2>
          <p>
            要使用 Gemini 模型，你需要一把"钥匙"。这被称为 <strong>API Key</strong>。
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4">
            <h4 className="font-bold text-amber-800">操作步骤：</h4>
            <ol className="list-decimal list-inside mt-2 space-y-2 text-amber-900 text-sm">
              <li>访问 <a href="https://aistudio.google.com/" target="_blank" rel="noreferrer" className="underline text-blue-600 hover:text-blue-800">Google AI Studio 官网</a> 并登录你的 Google 账号。</li>
              <li>点击左上角的 <strong>"Get API key"</strong> 按钮。</li>
              <li>点击 <strong>"Create API key in new project"</strong>。</li>
              <li>复制生成的以 <code>AIza</code> 开头的字符串。</li>
            </ol>
          </div>
          <p className="text-sm text-slate-500">
            注意：请妥善保管你的密钥，不要将其发布在公共代码库（如 GitHub）中。在本教程的演示环节，系统已经为你配置好了临时的测试环境，你<strong>不需要</strong>在这里输入你的密钥。
          </p>
          <div className="mt-6 p-4 bg-slate-100 rounded-lg border border-slate-200">
            <code className="text-xs font-mono text-slate-500 block mb-2">示例密钥格式 (仅供参考):</code>
            <code className="text-sm font-mono text-green-600 bg-white px-2 py-1 rounded border border-slate-200">AIzaSyD-example-key-do-not-use-real-key</code>
          </div>
        </div>
      )
    },
    {
      id: 'interface',
      title: '3. 理解 Prompt (提示词)',
      icon: CpuIcon,
      content: (
        <div className="space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">与 AI 对话的艺术</h2>
          <p>
            <strong>Prompt (提示词)</strong> 就是你发给 AI 的指令。写好提示词是获得高质量回答的关键。
          </p>
          
          <div className="space-y-4 my-6">
            <div className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-600 mb-2">❌ 糟糕的提示词</h4>
              <p className="bg-slate-50 p-2 rounded text-sm italic">"写个故事。"</p>
              <p className="text-xs text-slate-400 mt-1">太模糊，AI 不知道你需要什么风格、长度或主题。</p>
            </div>

            <div className="border border-slate-200 rounded-lg p-4 shadow-sm ring-1 ring-green-100">
              <h4 className="font-semibold text-green-600 mb-2">✅ 优秀的提示词</h4>
              <p className="bg-slate-50 p-2 rounded text-sm italic">"请以一个充满好奇心的5岁孩子的口吻，写一个关于为什么天空是蓝色的短故事，字数在100字以内。"</p>
              <p className="text-xs text-slate-400 mt-1">明确了角色 (Persona)、主题 (Topic) 和限制条件 (Constraints)。</p>
            </div>
          </div>

          <h3 className="font-bold text-lg text-slate-800 mt-6">主要模型选择</h3>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li><strong>Gemini 2.5 Flash:</strong> 速度极快，成本低，适合高频简单任务。</li>
            <li><strong>Gemini 3 Pro:</strong> 推理能力更强，适合处理复杂的逻辑、编程或数学问题。</li>
          </ul>
        </div>
      )
    },
    {
      id: 'demo',
      title: '4. 实战演示 (Playground)',
      icon: PlayIcon,
      content: (
        <div className="space-y-4 text-slate-600">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">亲自动手试试！</h2>
          <p>
            虽然我们无法在这里直接嵌入 Google AI Studio 的官方界面，但我们使用 Gemini API 搭建了一个迷你的<strong>模拟实验室</strong>。
          </p>
          <p className="text-sm">
            在下方的对话框中，尝试运用你刚才学到的"优秀提示词"技巧。
          </p>
          
          <LivePlayground />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans text-slate-800">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 flex-shrink-0 flex flex-col h-auto md:h-screen sticky top-0 z-10">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
               <CpuIcon className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-900">AI Studio</h1>
              <p className="text-xs text-slate-500 font-medium">中文入门教程</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 
                  ${isActive 
                    ? 'bg-indigo-50 text-indigo-700 shadow-sm border border-indigo-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'}`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                {step.title}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500 leading-relaxed">
            <span className="font-bold text-slate-700">小贴士:</span> 这是一个教学演示应用。真实开发请前往 aistudio.google.com
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-slate-50/30 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-10 md:px-12 md:py-12">
          {steps.map((step) => (
            activeStep === step.id && (
              <div key={step.id} className="animate-fadeIn">
                {step.content}
              </div>
            )
          ))}
          
          {/* Navigation Footer Buttons */}
          <div className="mt-12 pt-8 border-t border-slate-200 flex justify-between">
            {(() => {
              const currentIndex = steps.findIndex(s => s.id === activeStep);
              const prevStep = steps[currentIndex - 1];
              const nextStep = steps[currentIndex + 1];

              return (
                <>
                  <button
                    onClick={() => prevStep && setActiveStep(prevStep.id)}
                    disabled={!prevStep}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border
                      ${prevStep 
                        ? 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm' 
                        : 'bg-transparent border-transparent text-transparent cursor-default'}`}
                  >
                    &larr; 上一步
                  </button>
                  
                  <button
                    onClick={() => nextStep && setActiveStep(nextStep.id)}
                    disabled={!nextStep}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm
                      ${nextStep 
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md' 
                        : 'bg-transparent text-slate-400 cursor-default hidden'}`}
                  >
                    下一步 &rarr;
                  </button>
                </>
              );
            })()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;