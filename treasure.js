// ==================== 宝藏地图 API ====================
class TreasureMap {
  static getInitialClue() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("📚 在古老的图书馆里，你翻遍书架，找到了第一张羊皮卷线索...");
      }, 1000);
    });
  }

  static decodeAncientScript(clue) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!clue) {
          reject("没有线索可以解码！");
          return; 
        }
        resolve("🔍 你对照星座图解码羊皮卷，发现宝藏藏在沙漠尽头的古老神庙中...");
      }, 1500);
    });
  }

  
  static tradeWithCaravan() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const hasCoin = Math.random() > 0.3; 
        if (!hasCoin) {
          reject("💰 你身无分文，商队首领拒绝了交易，还把你赶出了营地！");
          return;
        }
        resolve("🐫 你用一枚古币与沙漠商队换到了一把青铜钥匙，继续向神庙前进...");
      }, 1600);
    });
  }

 
  static solveTemplePuzzle(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!location || !location.includes("神庙")) {
          reject("这里似乎不是神庙，机关毫无反应。");
          return;
        }
        const solved = Math.random() > 0.3; 
        if (!solved) {
          reject("🌌 星象机关排列错误，墙壁喷出流沙，你被迫退回入口！");
          return;
        }
        resolve("🌌 你按正确顺序点亮星象符文，石门缓缓打开，露出一条向下的阶梯...");
      }, 1800);
    });
  }


  static searchTemple(location) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();
       
        if (random < 0.5) {
          reject("⚔️ 糟糕！遇到了神庙守卫，你只能暂时撤退！");
          return; 
        }
        resolve("📦 你绕过守卫，在祭坛后发现了一个神秘的箱子...");
      }, 2000);
    });
  }

 
  static crossUndergroundRiver() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const boatOk = Math.random() > 0.2; 
        if (!boatOk) {
          reject("🌊 地下暗河突然涨水，小船被冲翻了，你狼狈地爬回岸边！");
          return;
        }
        resolve("🚣 你乘上腐朽的小船，顺着地下暗河漂流，终于抵达宝藏密室...");
      }, 1700);
    });
  }

  static openTreasureBox() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("🏆 恭喜！你打开了箱子，找到了传说中的黄金罗盘与无尽宝藏！");
      }, 1000);
    });
  }
}

// ==================== DOM 元素获取 ====================
const startBtn = document.getElementById("startBtn");
const logPanel = document.getElementById("logPanel");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const hero = document.getElementById("hero");
const resultEl = document.getElementById("result");

// ==================== 工具函数 ====================
let stepIndex = 0;
const totalSteps = 7; // 共7个异步情节

function updateLog(message, type = "normal") {
  const item = document.createElement("div");
  item.className = "log-item" + (type !== "normal" ? " " + type : "");
  item.textContent = message;
  logPanel.appendChild(item);
  logPanel.scrollTop = logPanel.scrollHeight;
}

function updateProgress(label) {
  stepIndex++;
  const percent = Math.min((stepIndex / totalSteps) * 100, 100);
  progressFill.style.width = percent + "%";
  progressText.textContent = label + `（${stepIndex}/${totalSteps}）`;
}

function resetUI() {
  stepIndex = 0;
  logPanel.innerHTML = "";
  resultEl.textContent = "";
  resultEl.className = "result";
  progressFill.style.width = "0%";
  progressText.textContent = "准备出发...";
  hero.className = "hero walking";
  startBtn.disabled = true;
  
  // 重置时去掉背景高亮
  document.body.classList.remove("victory-bg");
}

// ==================== async/await 主流程 ====================
async function findTreasureAsync() {
  resetUI();

  try {
    // 1. 图书馆寻线索
    const clue = await TreasureMap.getInitialClue();
    updateLog(clue);
    updateProgress("图书馆寻线索");

    // 2. 解码羊皮卷
    const location = await TreasureMap.decodeAncientScript(clue);
    updateLog(location);
    updateProgress("解码羊皮卷");

    // 3. 沙漠商队交易
    const key = await TreasureMap.tradeWithCaravan();
    updateLog(key);
    updateProgress("沙漠商队交易");

    // 4. 破解星象机关
    const passage = await TreasureMap.solveTemplePuzzle(location);
    updateLog(passage);
    updateProgress("破解星象机关");

    // 5. 搜索神庙
    const box = await TreasureMap.searchTemple(location);
    updateLog(box);
    updateProgress("搜索神庙");

    // 6. 渡过地下暗河
    const room = await TreasureMap.crossUndergroundRiver();
    updateLog(room);
    updateProgress("渡过地下暗河");

    // 7. 打开宝箱
    const treasure = await TreasureMap.openTreasureBox();
    updateLog(treasure, "success");
    updateProgress("打开宝箱");

    // 胜利动画
    hero.className = "hero celebrate";
    resultEl.textContent = "🎉 寻宝成功！你成为了传说中的寻宝大师！";
    resultEl.className = "result win";
    
    // 胜利时让背景高亮
    document.body.classList.add("victory-bg");
    
  } catch (error) {
    // 只要上面有任何一步抛出 reject，就会跳到这里
    updateLog(error, "error");
    hero.className = "hero";
    resultEl.textContent = "💀 寻宝失败，再来一次吧！";
    resultEl.className = "result lose";
  } finally {
    // 无论成功还是失败，都恢复按钮可点击状态
    startBtn.disabled = false;
    hero.classList.remove("walking");
  }
}

// ==================== 事件绑定 ====================
startBtn.addEventListener("click", findTreasureAsync);
