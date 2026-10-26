/* Chinese display text for the tool table. Filter keys stay in data-tools.js
   (kind, commercial, zh, xling, status, windows). Product names stay in English. */
window.TOOLS_ZH = {
  elevenlabs: {
    licence: "付费方案可商用；免费方案非商用，且要署名",
    audio: "即时克隆 1–2 分钟；专业克隆 30 分钟–3 小时",
    speed: "云端；Turbo 延迟约 100 毫秒",
    api: "很完整：REST 和 SDK、时间戳、强制对齐、词典、请求拼接",
    price: "每千字符 0.08 美元（Turbo 0.04）；方案从每月 6 美元起",
    notes: "自助选项里最完整的一家。专业克隆只能用自己的声音，还有声音验证码。你的声音被授予永久许可，用于改进服务；可以退出训练。"
  },
  gemini: {
    licence: "付费档；Vertex 预发布条款允许商用",
    audio: "10–30 秒，外加一段同意录音",
    speed: "云端；批量 API",
    api: "够用：google-genai SDK、REST、批量",
    price: "到 2026-12-31 大约每音频小时 0.82 美元，之后约 1.64；批量减半",
    notes: "预览。免费档会用你的内容改进产品，请用付费档。存下的声音在最后一次使用后再保留一年。"
  },
  "azure-pv": {
    licence: "受限访问；已发布内容只能用于获批的用途",
    audio: "5–90 秒，外加一段同意声明",
    speed: "云端",
    api: "SSML 和词典最好，有 WordBoundary 事件",
    price: "每百万字符 24 美元",
    notes: "微软说不会用你的数据训练；输出带水印。个人教师能否获批，没有核实。"
  },
  chirp3: {
    licence: "白名单；上生产要过安全审查",
    audio: "不超过 10 秒，外加一段同意录音",
    speed: "云端",
    api: "够用",
    price: "每百万字符 60 美元",
    notes: "不能从英语转到中文（en-US 只到德语、西班牙语、法语、葡萄牙语）。"
  },
  minimax: {
    licence: "输出的知识产权归你；基础许可是非商用，除非付费条款另有规定",
    audio: "10 秒–5 分钟",
    speed: "云端；异步最长一百万字符",
    api: "够用：异步长文、词级字幕、词典",
    price: "HD 每百万字符 100 美元，Turbo 60 美元；每个声音 1.50 美元",
    notes: "普通话口碑好。文档里没有同意步骤。相似度数字来自 CosyVoice README 里的 Seed-TTS-eval 表。"
  },
  "fish-api": {
    licence: "付费可商用。免费档：服务条款和价格页互相矛盾",
    audio: "至少 10 秒，1–2 分钟更好",
    speed: "云端",
    api: "REST 和 Python SDK，情绪标签",
    price: "每百万 UTF-8 字节 15 美元（一个汉字是 3 字节）",
    notes: "服务条款允许用你的内容训练。把克隆设为私有（免费档有公开声音名额）。"
  },
  cartesia: {
    licence: "按订阅档位可商用",
    audio: "即时 10–60 秒；专业 30 分钟以上",
    speed: "云端，低延迟",
    api: "够用：REST 和 WebSocket",
    price: "大约每百万字符 39 美元（Startup 方案）",
    notes: "默认用输入和输出训练（有退出表格）。“Add Voice Accents”用来加别的语言。有人报它在普通话克隆榜上排第二（二手来源）。"
  },
  inworld: {
    licence: "条款没有核对",
    audio: "即时 3–30 秒；专业 10 分钟以上",
    speed: "云端，实时",
    api: "API 和门户",
    price: "每百万字符 25 美元；克隆免费",
    notes: "有人报它在 Artificial Analysis 普通话克隆榜上排第一（二手来源，快照日期不明）。"
  },
  alibaba: {
    licence: "条款没有核对",
    audio: "10–20 秒（最长 60 秒）",
    speed: "云端",
    api: "DashScope REST / WebSocket",
    price: "3.0-plus 每万字符 0.20 美元（国际区）",
    notes: "Elo 是 Qwen-Audio-3.1（第二名）的，那个模型在中国区；国际区提供的是 3.0（Elo 1123）。"
  },
  volcengine: {
    licence: "中文条款没有核对",
    audio: "大约 5 秒",
    speed: "云端",
    api: "只有中文文档",
    price: "每万字符 3 元，外加每个声音 138 元",
    notes: "需要中国账号；多半要实名。"
  },
  tencent: {
    licence: "中文条款没有核对",
    audio: "一句话",
    speed: "云端",
    api: "只有中文文档",
    price: "每万字符 8 元，外加每个声音 39 元",
    notes: "需要实名账号。"
  },
  openai: {
    licence: "只有符合条件的客户，经销售开通",
    audio: "不超过 30 秒，外加一句同意语",
    speed: "云端",
    api: "接口本身不错，但普通开发者用不上",
    price: "按 gpt-4o-mini-tts 的 token 计价",
    notes: "普通开发者组织反馈说没有权限。"
  },
  resemble: {
    licence: "已停",
    audio: "-",
    speed: "-",
    api: "-",
    price: "-",
    notes: "“不再作为商业付费产品提供”。开源的 Chatterbox 还在。"
  },
  lmnt: {
    licence: "已关闭",
    audio: "-",
    speed: "-",
    api: "-",
    price: "-",
    notes: "“LMNT has shut down”。"
  },
  voxcpm2: {
    licence: "代码和权重都是 Apache-2.0",
    audio: "短参考片段（要克隆得最好，附上文字稿）；可用 LoRA 微调",
    speed: "RTX 4090 上 RTF 约 0.30（Nano-vLLM 约 0.13）",
    vram: "约 8 GB",
    api: "Python、命令行，经 vLLM-Omni 提供兼容 OpenAI 的服务",
    price: "免费，另付硬件",
    notes: "可商用的开源模型里，自报相似度最高。30 种语言，48 kHz。Windows 用 pip 安装，官方没有写成文档。"
  },
  qwen3tts: {
    licence: "代码和权重都是 Apache-2.0",
    audio: "3 秒，外加文字稿",
    speed: "RTX 2070 上 RTF 约 1.2（二手来源）",
    vram: "约 5–6 GB（二手来源）",
    api: "qwen-tts 包、网页演示、vLLM",
    price: "免费，另付硬件",
    notes: "自报词错率很低。长文用 1.7B，不要用 0.6B（二手来源）。仓库从三月起就很安静。"
  },
  cosyvoice3: {
    licence: "代码和权重都是 Apache-2.0（Hugging Face 标签已核对）",
    audio: "提示片段，外加文字稿",
    speed: "可流式；自报延迟约 150 毫秒",
    vram: "未写明",
    api: "Python，FastAPI 和 gRPC 服务，vLLM，TensorRT-LLM",
    price: "免费，另付硬件",
    notes: "有明确的跨语言模式、指令控制、拼音和 CMU 读音修正，18 种以上汉语方言。安装以 Linux 为先。"
  },
  chatterbox: {
    licence: "代码和权重都是 MIT；输出带 PerTh 水印",
    audio: "约 10 秒",
    speed: "Nano：8 个 CPU 核上约 3 倍实时（英语）",
    vram: "未写明",
    api: "Python（pip install chatterbox-tts）",
    price: "免费，另付硬件",
    notes: "安装最省事。参考语言和目标语言不同时口音会漏（README 建议 cfg_weight 设为 0）。Elo 是原来的英语模型。"
  },
  gptsovits: {
    licence: "代码和权重都是 MIT（Hugging Face 标签）",
    audio: "零样本 5 秒；微调大约 1 分钟起",
    speed: "RTX 4090 上 RTF 0.014；Apple M4 CPU 上 0.526（自报）",
    vram: "未写明",
    api: "WebUI、HTTP API 脚本、Python",
    price: "免费，另付硬件",
    notes: "唯一带官方 Windows 一键包、又能用你自己的几分钟录音轻松微调的选项。自带切片、语音识别和标注工具。"
  },
  indextts: {
    licence: "bilibili 模型使用许可：月活低于 1 亿或年收入低于 10 亿元人民币可免版税；README 说商用要联系",
    audio: "参考片段；情绪参考可选",
    speed: "RTX 4090 上 RTF 0.21（2.5）到 0.33（2）",
    vram: "至少 8 GB（有人报告更高）",
    api: "Python API、Gradio 界面",
    price: "免费，另付硬件",
    notes: "自报的跨语言（中到英）相似度最好；能控时长和情绪；可拼音覆盖。相似度数字是 IndexTTS2 的。许可禁止用输出去改进别的商业人工智能模型。"
  },
  "fish-open": {
    licence: "权重：Fish Audio Research License（商用要另签书面许可）",
    audio: "10–30 秒",
    speed: "一块 H200 上 RTF 0.195（S2-Pro）",
    vram: "未写明（4B；Drama 3 是 35B-A3B MoE）",
    api: "命令行、API 服务、WebUI",
    price: "研究免费；商用要许可",
    notes: "开源权重里的质量上限（自报词错率最低）。代码许可允许年收入低于 50 万美元时商用，但权重不允许。Elo 是经 Fish API 的 Drama 3 预览。"
  },
  f5tts: {
    licence: "代码 MIT；权重 CC-BY-NC-4.0（Emilia 数据）",
    audio: "短片段，外加文字稿",
    speed: "L20 上 RTF 0.15；TensorRT-LLM 为 0.04",
    vram: "约 2 GB（二手来源）",
    api: "pip f5-tts、命令行、Gradio、Docker",
    price: "免费，非商用",
    notes: "唯一写明支持 Intel GPU（XPU）的模型。用来学习和做实验很好。"
  },
  omnivoice: {
    licence: "仓库 Apache-2.0；Hugging Face 卡片没写权重许可；训练用了 Emilia（CC-BY-NC）",
    audio: "参考音频，外加文字稿",
    speed: "H100 批量时 RTF 可低到 0.025",
    vram: "未写明",
    api: "Python、网页演示",
    price: "免费；能不能商用不清楚",
    notes: "600 多种语言。有助手说 README 里写了权重是 CC-BY-NC；主代理在 2026-10-17 的 README 里没找到这句话。在澄清之前，按非商用对待。"
  },
  higgs: {
    licence: "研究与非商用，外加创作者使用授权（在你自己的频道上变现，并署名）",
    audio: "参考片段",
    speed: "未写明",
    vram: "未写明（4B）",
    api: "Boson API、SGLang-Omni",
    price: "免费，但有条件",
    notes: "创作者授权要致谢 “Boson AI's Higgs Audio”；在你不拥有的平台上卖课，算不算，不清楚。v2 在难的中文例子上是这组里最弱的。"
  },
  vibevoice: {
    licence: "MIT，但语音合成代码已删；“仅供研究与开发”",
    audio: "参考片段",
    speed: "最长 90 分钟，4 个说话人",
    api: "只有社区分支",
    price: "-",
    notes: "2025-09-05 因滥用删掉了语音合成代码；仓库现在主要是语音识别。不要拿来做长期流水线。"
  },
  xtts: {
    licence: "代码 MPL-2.0；Coqui 公共模型许可：模型和它的输出都非商用",
    audio: "6 秒",
    speed: "未写明",
    vram: "未写明",
    api: "coqui-tts 包（有 Windows 轮子）",
    price: "免费，非商用",
    notes: "Coqui 已关闭，没有人能卖商用许可。分支还在维护。原仓库 46128 星，2024-08 起停滞。"
  },
  megatts3: {
    licence: "Apache-2.0，但声音编码器没有公开",
    audio: "把短于 24 秒的样本发给字节跳动，换潜向量",
    speed: "CPU 上大约每 10 步 30 秒",
    vram: "未写明",
    api: "Python",
    price: "免费",
    notes: "必须把声音上传到一个 Google Drive 文件夹才能拿到能用的潜向量：不适合私密的、只用自己声音的流程。"
  },
  spark: {
    licence: "代码 Apache-2.0；权重 CC-BY-NC-SA-4.0",
    audio: "参考片段",
    speed: "-",
    price: "免费，非商用",
    api: "Python",
    notes: "汇总表里相似度偏低。"
  },
  maskgct: {
    licence: "代码 MIT；权重 CC-BY-NC-4.0",
    audio: "参考片段",
    speed: "慢（非自回归，步数多）",
    api: "Python",
    price: "免费，非商用",
    notes: "研究模型。"
  },
  llasa: {
    licence: "代码和权重都是 CC BY-NC 4.0",
    audio: "参考片段",
    speed: "-",
    api: "Python",
    price: "免费，非商用",
    notes: "研究模型。"
  },
  fireredtts2: {
    licence: "代码和权重都是 Apache-2.0",
    audio: "参考片段",
    speed: "可流式",
    vram: "9 GB（bf16）",
    api: "Python",
    price: "免费，另付硬件",
    notes: "为多说话人对话而做；跨语言基准上偏弱。"
  },
  mossttsd: {
    licence: "Apache-2.0",
    audio: "每个说话人一段参考",
    speed: "-",
    api: "Python、SGLang 服务",
    price: "免费，另付硬件",
    notes: "重心是长对话。"
  },
  zonos: {
    licence: "代码和权重都是 Apache-2.0",
    audio: "10–30 秒",
    speed: "RTX 4090 上约 2 倍实时",
    vram: "6 GB 起",
    api: "Python、Gradio",
    price: "免费，另付硬件",
    notes: "Windows 靠社区分支。"
  },
  openvoice: {
    licence: "代码和权重都是 MIT",
    audio: "短片段",
    speed: "快",
    vram: "较低",
    api: "Python",
    price: "免费，另付硬件",
    notes: "加在 MeloTTS 上的音色转换器；克隆声音榜上最低。"
  },
  kokoro: {
    licence: "Apache-2.0",
    audio: "不能克隆",
    speed: "很快，CPU 也能跑",
    vram: "很小",
    api: "Python",
    price: "免费",
    notes: "只有预设声音；适合当作不克隆的后备。"
  },
  pockettts: {
    licence: "代码 MIT；权重 CC-BY-4.0（要署名）",
    audio: "WAV 提示",
    speed: "两核 CPU（M4）上约 6 倍实时",
    vram: "CPU",
    api: "命令行、本地 HTTP 服务",
    price: "免费",
    notes: "没有中文。CPU 优先的英语选项里最好的一个。"
  },
  orpheus: {
    licence: "Apache-2.0（需审批）",
    audio: "克隆是涌现出来的，不是专门训练的",
    speed: "-",
    api: "Python",
    price: "免费",
    notes: "以英语为中心。"
  },
  csm: {
    licence: "Apache-2.0（需审批）",
    audio: "上下文音频",
    speed: "-",
    api: "Python",
    price: "免费",
    notes: "别的语言“多半做不好”。"
  },
  dia2: {
    licence: "Apache-2.0",
    audio: "提示音频",
    speed: "可流式",
    api: "Python",
    price: "免费",
    notes: "只有英语，最长 2 分钟。"
  },
  rvc: {
    licence: "代码 MIT；HuBERT、ContentVec、RMVPE 的权重许可要另查",
    audio: "至少 10 分钟干净语音",
    speed: "实时，90–170 毫秒",
    vram: "训练约 8 GB（社区说法）",
    api: "WebUI、命令行脚本",
    price: "免费，另付硬件",
    notes: "把你自己读出来的音频（你说得出的任何语言）转成收拾过的音色；韵律还是你的。"
  },
  applio: {
    licence: "MIT；README 请商用用户联系团队",
    audio: "10–30 分钟",
    speed: "实时",
    vram: "训练需要 RTX 20xx 及以上",
    api: "WebUI、命令行",
    price: "免费，另付硬件",
    notes: "界面更友好；有 Windows 构建。"
  },
  meanvc2: {
    licence: "README 写 Apache-2.0；仓库里没有许可证文件",
    audio: "参考片段（零样本）",
    speed: "单核 CPU 上 RTF 小于 0.633",
    vram: "CPU",
    api: "预编译的 Windows 可执行文件",
    price: "免费",
    notes: "找到的最好的纯 CPU 选项；非常新。"
  },
  seedvc: {
    licence: "GPL-3.0（再分发时有著佐权）",
    audio: "1–30 秒",
    speed: "实时约 430 毫秒",
    api: "Python、Gradio",
    price: "免费",
    notes: "已归档：还能用，不再修。"
  },
  "el-sts": {
    licence: "付费方案",
    audio: "目标是你的即时或专业克隆",
    speed: "云端；每次请求最长 5 分钟",
    api: "REST",
    price: "每分钟音频 0.12 美元",
    notes: "按音频分钟计费，所以语言不影响价格。"
  }
};
