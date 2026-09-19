/**
 * ネットワークスペシャリスト試験対策アプリ
 * チャート管理モジュール (Chart.jsを利用)
 */

class ChartManager {
  constructor() {
    this.charts = {}; // チャートインスタンスを保存し、再描画時の破棄に使用
    
    // アプリのメインカラー
    this.colors = {
      primary: '#1a73e8',
      success: '#34a853',
      error: '#ea4335',
      warning: '#fbbc04',
      info: '#4285f4',
      network: '#1a73e8',
      security: '#ea4335',
      system: '#34a853',
      other: '#9aa0a6',
      darkText: '#e8eaed',
      lightText: '#202124',
      darkGrid: '#3c4043',
      lightGrid: '#e8eaed'
    };
  }

  // ダークモードの判定
  isDarkMode() {
    return document.documentElement.getAttribute('data-theme') === 'dark';
  }

  // 共通のフォントカラー設定
  getTextColor() {
    return this.isDarkMode() ? this.colors.darkText : this.colors.lightText;
  }

  // 共通のグリッドカラー設定
  getGridColor() {
    return this.isDarkMode() ? this.colors.darkGrid : this.colors.lightGrid;
  }

  // 既存のチャートを破棄
  destroyChart(canvasId) {
    if (this.charts[canvasId]) {
      this.charts[canvasId].destroy();
      delete this.charts[canvasId];
    }
  }

  // 1. 年度別再出題率チャート (Bar chart)
  renderReuseRateChart(canvasId, data) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = data.map(d => d.yearLabel);
    const rates = data.map(d => d.rate);
    const avgRate = rates.length > 0 ? rates.reduce((a, b) => a + b, 0) / rates.length : 0;
    const avgData = new Array(rates.length).fill(avgRate);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            type: 'line',
            label: '平均再出題率',
            data: avgData,
            borderColor: this.colors.error,
            borderWidth: 2,
            borderDash: [5, 5],
            fill: false,
            pointRadius: 0
          },
          {
            type: 'bar',
            label: '再出題率 (%)',
            data: rates,
            backgroundColor: this.colors.primary,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: this.getTextColor() } },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: this.getTextColor() },
            grid: { color: this.getGridColor() }
          },
          x: {
            ticks: { color: this.getTextColor() },
            grid: { color: this.getGridColor() }
          }
        }
      }
    });
  }

  // 2. 分野別出題数チャート (Pie/Doughnut chart)
  renderCategoryChart(canvasId, data) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = data.map(d => d.label);
    const counts = data.map(d => d.count);
    const backgroundColors = data.map(d => d.color || this.colors.primary);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: counts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
          borderColor: this.isDarkMode() ? '#202124' : '#ffffff'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right', labels: { color: this.getTextColor() } },
          tooltip: {
            callbacks: {
              label: function(context) {
                const value = context.raw;
                const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${context.label}: ${value}問 (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }

  // 3. サブカテゴリ別頻度チャート (Horizontal bar chart)
  renderSubcategoryChart(canvasId, data) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    // 件数で降順ソート
    const sortedData = [...data].sort((a, b) => b.count - a.count);
    const labels = sortedData.map(d => d.label);
    const counts = sortedData.map(d => d.count);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '出題数',
          data: counts,
          backgroundColor: this.colors.info,
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            beginAtZero: true,
            ticks: { color: this.getTextColor(), stepSize: 1 },
            grid: { color: this.getGridColor() }
          },
          y: {
            ticks: { color: this.getTextColor() },
            grid: { color: this.getGridColor(), display: false }
          }
        }
      }
    });
  }

  // 4. 正答率推移チャート (Line chart)
  renderAccuracyTrendChart(canvasId, data) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = data.map(d => d.date);
    const accuracies = data.map(d => d.accuracy);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: '正答率 (%)',
          data: accuracies,
          borderColor: this.colors.success,
          backgroundColor: 'rgba(52, 168, 83, 0.1)',
          fill: true,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: this.getTextColor() } },
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            ticks: { color: this.getTextColor() },
            grid: { color: this.getGridColor() }
          },
          x: {
            ticks: { color: this.getTextColor(), maxTicksLimit: 10 },
            grid: { color: this.getGridColor() }
          }
        }
      }
    });
  }

  // 5. 分野別正答率レーダーチャート (Radar chart)
  renderAccuracyRadarChart(canvasId, data) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = data.map(d => d.label);
    const accuracies = data.map(d => d.accuracy);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [{
          label: '分野別正答率 (%)',
          data: accuracies,
          borderColor: this.colors.primary,
          backgroundColor: 'rgba(26, 115, 232, 0.2)',
          pointBackgroundColor: this.colors.primary,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: this.getTextColor() } },
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            pointLabels: { color: this.getTextColor(), font: { size: 12 } },
            ticks: { display: false },
            grid: { color: this.getGridColor() },
            angleLines: { color: this.getGridColor() }
          }
        }
      }
    });
  }

  // 6. 年度別分野構成チャート (Stacked bar chart)
  renderYearlyCompositionChart(canvasId, data) {
    this.destroyChart(canvasId);
    const ctx = document.getElementById(canvasId);
    if (!ctx) return;

    const labels = data.map(d => d.yearLabel);
    
    // データ構造の例: data = [{ yearLabel: 'R5', nw: 15, sec: 5, other: 5 }, ...]
    const nwData = data.map(d => d.nw || 0);
    const secData = data.map(d => d.sec || 0);
    const otherData = data.map(d => d.other || 0);

    this.charts[canvasId] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'ネットワーク',
            data: nwData,
            backgroundColor: this.colors.network,
          },
          {
            label: 'セキュリティ',
            data: secData,
            backgroundColor: this.colors.security,
          },
          {
            label: 'その他',
            data: otherData,
            backgroundColor: this.colors.other,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: this.getTextColor() } },
          tooltip: { mode: 'index', intersect: false }
        },
        scales: {
          x: {
            stacked: true,
            ticks: { color: this.getTextColor() },
            grid: { color: this.getGridColor(), display: false }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            ticks: { color: this.getTextColor(), stepSize: 5 },
            grid: { color: this.getGridColor() }
          }
        }
      }
    });
  }

  // 7. 学習カレンダーヒートマップ (custom canvas drawing)
  renderStudyCalendar(canvasId, data) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // キャンバスをクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // サイズ設定
    const cellSize = 12;
    const cellMargin = 2;
    const weeks = 52;
    const days = 7;
    
    // Canvasの論理サイズを調整
    canvas.width = (cellSize + cellMargin) * weeks + 20;
    canvas.height = (cellSize + cellMargin) * days + 20;
    
    // 色の定義 (GitHubスタイル)
    const getColor = (count) => {
      const isDark = this.isDarkMode();
      if (count === 0) return isDark ? '#161b22' : '#ebedf0';
      if (count < 5) return '#9be9a8';
      if (count < 15) return '#40c463';
      if (count < 30) return '#30a14e';
      return '#216e39';
    };

    // データのマッピング ({ 'YYYY-MM-DD': count })
    const dataMap = {};
    data.forEach(d => { dataMap[d.date] = d.count; });

    // 今日を起点に直近1年を描画
    const today = new Date();
    today.setHours(0,0,0,0);
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - (weeks * days) + 1);

    // グリッドの描画
    let currentDate = new Date(startDate);
    for (let w = 0; w < weeks; w++) {
      for (let d = 0; d < days; d++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        const count = dataMap[dateStr] || 0;
        
        ctx.fillStyle = getColor(count);
        ctx.fillRect(
          w * (cellSize + cellMargin) + 20, 
          d * (cellSize + cellMargin), 
          cellSize, 
          cellSize
        );
        
        // 四角に角丸をつけるためのオプション (シンプル化のためfillRect使用)
        currentDate.setDate(currentDate.getDate() + 1);
      }
    }
  }

  // Update all charts on the statistics page
  updateAllCharts(statsManager) {
    // 統計データから各チャート用のデータを生成して描画
    // ※statsManagerに依存する各メソッドを呼び出す想定
    // renderReuseRateChart('reuseRateChart', statsManager.getReuseRateData());
    // ...
  }
}

// グローバルスコープへ公開
window.ChartManager = ChartManager;
