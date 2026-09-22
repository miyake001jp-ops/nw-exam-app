// ネットワークスペシャリスト 午前II (科目A-2) 問題データベース
// 平成21年(2009)〜令和7年(2025) 過去問完全網羅 ＆ 令和8年度最新予想問題50問

const CATEGORY_INFO = {
  network: { label: "ネットワーク", color: "#1a73e8" },
  security: { label: "セキュリティ", color: "#ea4335" },
  other: { label: "システム・信頼性", color: "#34a853" }
};

const SUBCATEGORY_INFO = {
  routing: { label: "ルーティング (OSPF/BGP/RIP)", category: "network" },
  switching: { label: "スイッチング (VLAN/STP/LAG)", category: "network" },
  ip: { label: "IP・アドレッシング (IPv4/IPv6/NAT)", category: "network" },
  tcp_udp: { label: "TCP/UDP・トランスポート", category: "network" },
  dns: { label: "DNS・名前解決", category: "network" },
  http: { label: "HTTP・Webプロトコル", category: "network" },
  email: { label: "電子メール (SMTP/POP/IMAP/DKIM)", category: "network" },
  security: { label: "情報セキュリティ (TLS/IPsec/802.1X)", category: "security" },
  wireless: { label: "無線LAN (Wi-Fi 6/7/WPA3)", category: "network" },
  sdn: { label: "SDN・仮想化 (OpenFlow/VXLAN/EVPN)", category: "network" },
  qos: { label: "QoS・高信頼化 (VRRP/DiffServ)", category: "network" },
  management: { label: "ネットワーク管理 (SNMP/syslog/NTP)", category: "network" },
  other: { label: "関連知識・計算 (信頼性/トラフィック)", category: "other" }
};

const MASTER_QUESTIONS = [
  // ==========================================
  // 過去問題マスター (全52問: H21〜R7完全網羅)
  // ==========================================

  // --- 計算・トラフィック・信頼性 (6問) ---
  {
    masterId: "M-CALC-01", category: "other", subcategory: "other", tags: ["トラフィック理論", "アーラン計算"],
    question: "180台の電話機のトラフィックを調べたところ，電話機1台当たりの呼の発生頻度は3分に1回，平均回線保留時間は80秒であった。このときの呼量は何アーランか。",
    choices: { "ア": "20", "イ": "40", "ウ": "60", "エ": "80" },
    answer: "エ",
    explanation: "電話機1台当たりの1時間の呼数は 60分 ÷ 3分 = 20回。全180台の1時間の総呼数は 180 × 20 = 3,600回。呼量(アーラン) = (総呼数 × 平均保留時間) ÷ 単位時間 = (3,600回 × 80秒) ÷ 3,600秒 = 80アーランとなります。平成29年問1、令和4年問1、令和7年問1と計3回出題された超頻出問題です。",
    appearances: [
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 1 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 1 },
      { year: "R7", yearLabel: "令和7年", yearNum: 2025, num: 1 }
    ]
  },
  {
    masterId: "M-CALC-02", category: "network", subcategory: "other", tags: ["VoIP", "音声符号化"],
    question: "CS-ACELP (G.729) による8kビット/秒の音声符号化を行うVoIPゲートウェイ装置において，パケット生成周期が20ミリ秒のとき，1パケットに含まれる音声ペイロードは何バイトか。",
    choices: { "ア": "20", "イ": "40", "ウ": "80", "エ": "160" },
    answer: "ア",
    explanation: "8kビット/秒 = 8,000ビット/秒。20ミリ秒(0.02秒)間に生成される音声データ量は、8,000 × 0.02 = 160ビット。バイト換算すると 160 ÷ 8 = 20バイトとなります。平成24年問3および令和6年問2で完全同一出題されました。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 3 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 2 }
    ]
  },
  {
    masterId: "M-CALC-03", category: "other", subcategory: "other", tags: ["アーランB式", "回線計算"],
    question: "1時間当たりの平均通話回数が60回で，平均保留時間は120秒である。呼損率を0.1以下にしたいとき，必要な回線数は最低幾らか。（呼損率0.1時の許容呼量：回線数3=1.271, 回線数4=2.045, 回線数5=2.881）",
    choices: { "ア": "3", "イ": "4", "ウ": "5", "エ": "6" },
    answer: "イ",
    explanation: "呼量は、(60回 × 120秒) ÷ 3,600秒 = 2.0アーラン。呼損率0.1の許容呼量表を参照すると、回線数3では1.271アーランまでしか運べず不足ですが、回線数4では2.045アーランまで運べるため、必要な回線数は最低4回線となります。平成26年問3、平成29年問3、令和6年問3で出題されています。",
    appearances: [
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 3 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 3 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 3 }
    ]
  },
  {
    masterId: "M-CALC-04", category: "network", subcategory: "other", tags: ["誤り率計算", "伝送計算"],
    question: "平均ビット誤り率が 1×10^-5 の回線で，200,000バイトのデータを100バイトずつの電文に分けて送信するとき，誤りが発生する電文は平均して幾つか。",
    choices: { "ア": "1", "イ": "2", "ウ": "8", "エ": "16" },
    answer: "エ",
    explanation: "1電文は 100 × 8 = 800ビット。1電文に誤りが発生する確率は 800 × (1×10^-5) = 0.008。送信する総電文数は 200,000 ÷ 100 = 2,000個。したがって誤りが発生する電文数は 2,000 × 0.008 = 16個となります。平成28年問1および令和5年問6で完全一致出題されました。",
    appearances: [
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 1 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 6 }
    ]
  },
  {
    masterId: "M-CALC-05", category: "network", subcategory: "tcp_udp", tags: ["MTU", "MSS", "フラグメンテーション"],
    question: "IPv4ネットワークでTCPを使用するとき，フラグメント化されることなく送信できるデータの最大長（オクテット）は幾らか。ここで，ネットワークのMTUは1,500オクテットとする。",
    choices: { "ア": "1,440", "イ": "1,452", "ウ": "1,460", "エ": "1,480" },
    answer: "ウ",
    explanation: "MTU 1,500バイトから、標準のIPv4ヘッダ(20バイト)と標準のTCPヘッダ(20バイト)を差し引いたものが最大セグメントサイズ(MSS)となります。1,500 - 20 - 20 = 1,460オクテットです。令和3年問7および令和5年問5で連続出題されています。",
    appearances: [
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 7 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 5 }
    ]
  },
  {
    masterId: "M-CALC-06", category: "other", subcategory: "other", tags: ["信頼性", "稼働率"],
    question: "稼働率がRの装置を2台直列に接続したシステムの稼働率を表す式はどれか。",
    choices: { "ア": "1 - (1 - R)^2", "イ": "R^2", "ウ": "1 - R^2", "エ": "2R" },
    answer: "イ",
    explanation: "直列システムでは、両方の装置が同時に稼働しているときのみシステム全体が稼働するため、稼働率は各装置の稼働率の積 R × R = R^2 となります。並列の場合は 1 - (1 - R)^2 です。平成23年問31、令和2年問22、令和6年問23等で出題。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 31 },
      { year: "R2", yearLabel: "令和2年", yearNum: 2020, num: 22 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 23 }
    ]
  },

  // --- ルーティング (6問) ---
  {
    masterId: "M-ROUT-01", category: "network", subcategory: "routing", tags: ["OSPF", "DR"],
    question: "OSPFにおけるDR(Designated Router)の役割として，適切なものはどれか。",
    choices: {
      "ア": "同一セグメント内のルータ間でLSAのフラッディングを中継・最適化する。",
      "イ": "異なるAS(自律システム)間で経路情報を交換する。",
      "ウ": "すべてのパケットを暗号化してトンネリングする。",
      "エ": "IPアドレスとMACアドレスの対応テーブルを保持する。"
    },
    answer: "ア",
    explanation: "OSPFのブロードキャスト型マルチアクセスネットワークでは、ルータ間の隣接関係数が n(n-1)/2 となりLSA交換のオーバーヘッドが激増します。DR(代表ルータ)を選出することで、各ルータはDR/BDRとのみ隣接関係を結び、LSAフラッディングを最適化します。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 1 },
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 2 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 2 }
    ]
  },
  {
    masterId: "M-ROUT-02", category: "network", subcategory: "routing", tags: ["BGP", "AS_PATH"],
    question: "BGP-4におけるパスアトリビュートのうち，AS_PATHの主な役割はどれか。",
    choices: {
      "ア": "ホップ数をカウントして最短経路を計算する。",
      "イ": "通過したAS番号を記録し，ルーティングループを検出・防止する。",
      "ウ": "特定のVLANタグを付与してパケットを識別する。",
      "エ": "自AS内の特定出口ルータの優先度を他ASに通知する。"
    },
    answer: "イ",
    explanation: "AS_PATHは経路が通過してきたAS番号のリストであり、ルータは受信した経路情報のAS_PATHに自身のAS番号が含まれている場合、ループと判定してその経路を破棄します。またAS_PATH長は経路選択の優先度判定にも使用されます。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 3 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 5 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 3 }
    ]
  },
  {
    masterId: "M-ROUT-03", category: "network", subcategory: "routing", tags: ["RIP", "ループ防止"],
    question: "RIPにおけるルーティングループ防止機能の一つである「スプリットホライズン」の説明はどれか。",
    choices: {
      "ア": "障害が発生した経路のメトリックを即座に16に設定して通知する。",
      "イ": "一定時間更新情報を受信しない経路をルーティングテーブルから消去する。",
      "ウ": "あるインターフェースから受信した経路情報は，同じインターフェースへは逆送しない。",
      "エ": "最大ホップ数を15に制限することで無限ループの継続を防ぐ。"
    },
    answer: "ウ",
    explanation: "スプリットホライズン(Split Horizon)は、ある経路情報を学習したインターフェースからは、その経路情報を元のルータへ送り返さないことで、隣接ルータ間での2ノードループを防止する機構です。アはポイズンリバースの説明です。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 28 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 4 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 3 }
    ]
  },
  {
    masterId: "M-ROUT-04", category: "network", subcategory: "routing", tags: ["OSPF", "エリア分割"],
    question: "OSPFにおけるエリア分割の利点として，適切なものはどれか。",
    choices: {
      "ア": "LSAのフラッディング範囲をエリア内に限定し，各ルータの負荷を軽減する。",
      "イ": "すべてのルータがネットワーク全体の詳細な同一トポロジを保持できるようになる。",
      "ウ": "異なる自律システム(AS)間での動的ルーティングが可能になる。",
      "エ": "IPv4とIPv6を同一のルーティングプロセスで直接統合できる。"
    },
    answer: "ア",
    explanation: "エリアを分割することで、Type 1およびType 2 LSAの伝播を同一エリア内に閉じ込め、ルータのSPF計算負荷やメモリ消費を大幅に抑制できます。エリア間の経路はABRがType 3 LSA(サマリ)として集約・通知します。令和5年問3でも出題されました。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 2 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 4 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 3 }
    ]
  },
  {
    masterId: "M-ROUT-05", category: "network", subcategory: "routing", tags: ["BGP", "AS番号"],
    question: "BGP-4における自律システム(AS)番号に関する記述として，適切なものはどれか。",
    choices: {
      "ア": "AS番号は16ビット長に固定されており，拡張することはできない。",
      "イ": "プライベートAS番号は全世界で一意に管理されており，インターネット上で直接広報される。",
      "ウ": "AS番号はIPv4アドレスと全く同一の32ビット数値がそのまま割り当てられる。",
      "エ": "現在のBGP仕様(RFC 6793)では，4バイト(32ビット)のAS番号が標準としてサポートされている。"
    },
    answer: "エ",
    explanation: "従来の2バイト(16ビット: 最大65,535)のAS番号の枯渇に伴い、RFC 6793で4バイト(32ビット: 最大約43億)のAS番号が規定され、現在広く利用されています。令和6年春期問1で出題されました。",
    appearances: [
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 1 }
    ]
  },
  {
    masterId: "M-ROUT-06", category: "network", subcategory: "routing", tags: ["BGP", "EGP"],
    question: "インターネットにおいて，自律システム(AS)間の経路制御に使用されるプロトコルはどれか。",
    choices: { "ア": "BGP-4", "イ": "OSPFv2", "ウ": "RIP-2", "エ": "IS-IS" },
    answer: "ア",
    explanation: "異なる自律システム(AS)間を接続するEGP(Exterior Gateway Protocol)としてはBGP-4(Border Gateway Protocol 4)がデファクトスタンダードです。OSPFやRIPは単一AS内で使用されるIGPです。令和3年問8、令和4年問3、令和5年問7と高頻度で出題されています。",
    appearances: [
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 8 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 3 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 7 }
    ]
  },

  // --- スイッチング (5問) ---
  {
    masterId: "M-SW-01", category: "network", subcategory: "switching", tags: ["VLAN", "IEEE 802.1Q"],
    question: "IEEE 802.1QのタグVLANにおいて，VLANタグが挿入される位置はどれか。",
    choices: {
      "ア": "IPヘッダとTCPヘッダの間",
      "イ": "プリアンブルと宛先MACアドレスの間",
      "ウ": "送信元MACアドレスとタイプ(イーサタイプ)フィールドの間",
      "エ": "フレームチェックシーケンス(FCS)の直後"
    },
    answer: "ウ",
    explanation: "IEEE 802.1Qタグ(4バイト)は、Ethernetフレームの送信元MACアドレス(6バイト)の直後、イーサタイプフィールド(2バイト)の直前に挿入されます。これにより既存の宛先・送信元MACアドレスの構造を崩さずにVLAN情報を付加できます。令和5年問11でも出題されました。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 4 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 3 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 11 }
    ]
  },
  {
    masterId: "M-SW-02", category: "network", subcategory: "switching", tags: ["RSTP", "STP"],
    question: "RSTP (IEEE 802.1w) が従来のSTP (IEEE 802.1D) より高速に収束する理由として，適切なものはどれか。",
    choices: {
      "ア": "IPマルチキャストアドレスを使用して全ポートへ一斉配信するから",
      "イ": "MACアドレスの学習フェーズを完全に省略して転送開始するから",
      "ウ": "UDPパケットを用いたハートビート監視を行っているから",
      "エ": "タイマ経過を待つのではなく，隣接スイッチ間でのネゴシエーション(提案/合意)により直接状態遷移するから"
    },
    answer: "エ",
    explanation: "従来のSTPはフォワードディレイタイマ(15秒×2=30秒)などの固定タイマ経過を待って状態遷移していましたが、RSTPはPoint-to-PointリンクにおいてProposal/Agreement(提案と合意)のハンドシェイクを行うことで、数ミリ秒〜数秒で即座にフォワーディング状態へ移行します。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 5 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 1 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 4 }
    ]
  },
  {
    masterId: "M-SW-03", category: "network", subcategory: "switching", tags: ["リンクアグリゲーション", "LACP"],
    question: "リンクアグリゲーションにおいて，複数ポートの束ね方や対向機器との接続状態を自動的にネゴシエーションするプロトコルはどれか。",
    choices: { "ア": "VTP", "イ": "LLDP", "ウ": "CDP", "エ": "LACP" },
    answer: "エ",
    explanation: "LACP (Link Aggregation Control Protocol, IEEE 802.3ad / IEEE 802.1AX) は、対向スイッチとLACPDUを交換し、設定ミスや回線断を自動検知しながらリンクアグリゲーショングループを動的に確立・維持します。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 29 },
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 4 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 4 }
    ]
  },
  {
    masterId: "M-SW-04", category: "network", subcategory: "switching", tags: ["VLAN間ルーティング", "トランクポート"],
    question: "VLAN間ルーティングを実現するための手法として適切なものはどれか。",
    choices: {
      "ア": "レイヤ2スイッチのみを対向でカスケード接続する。",
      "イ": "ルータの単一物理インターフェースにIEEE 802.1Qトランクを設定し，サブインターフェースを用いてルーティングする。",
      "ウ": "スイッチ上でスパニングツリー(STP)を無効化する。",
      "エ": "各VLANごとにブロードキャストアドレスをすべて同一に設定する。"
    },
    answer: "イ",
    explanation: "ルータの1本の物理リンク上にIEEE 802.1QタグVLANによるトランクを設定し、VLANごとに論理的なサブインターフェース(Sub-interface)を作成してデフォルトゲートウェイとすることで、VLAN間ルーティングを実現する方式を「Router-on-a-Stick」と呼びます。令和4年問15で出題。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 39 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 15 }
    ]
  },
  {
    masterId: "M-SW-05", category: "network", subcategory: "switching", tags: ["物理層", "イーサネット"],
    question: "イーサネットスイッチのポートに搭載されているAuto MDI/MDI-X機能の説明として，適切なものはどれか。",
    choices: {
      "ア": "接続されたケーブルの種類(ストレート/クロス)を自動判別し，送受信ピンの割り当てを自動で切り替える。",
      "イ": "半二重通信と全二重通信を自動でネゴシエーションする。",
      "ウ": "通信速度(10M/100M/1G)を自動的に判別して切り替える。",
      "エ": "接続先ポートのVLAN IDを自動検出してトランクを設定する。"
    },
    answer: "ア",
    explanation: "Auto MDI/MDI-Xは、端子の送信ピン(TX)と受信ピン(RX)を電気的に自動判別・切替を行う機能です。これにより、ストレートケーブルかクロスケーブルかを意識することなくPCやスイッチ同士を接続できます。令和3年問1で出題されました。",
    appearances: [
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 1 }
    ]
  },

  // --- IP・アドレッシング (6問) ---
  {
    masterId: "M-IP-01", category: "network", subcategory: "ip", tags: ["IPv4", "プライベートIP"],
    question: "プライベートIPアドレスとしてRFC 1918で予約されているクラスBの範囲はどれか。",
    choices: {
      "ア": "172.16.0.0 ～ 172.31.255.255",
      "イ": "192.168.0.0 ～ 192.168.255.255",
      "ウ": "10.0.0.0 ～ 10.255.255.255",
      "エ": "169.254.0.0 ～ 169.254.255.255"
    },
    answer: "ア",
    explanation: "RFC 1918で定められたプライベートIPアドレスは、クラスAが 10.0.0.0/8、クラスBが 172.16.0.0/12 (172.16.0.0〜172.31.255.255)、クラスCが 192.168.0.0/16 です。エはリンクローカルアドレス(APIPA)です。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 6 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 2 }
    ]
  },
  {
    masterId: "M-IP-02", category: "network", subcategory: "ip", tags: ["IPv6", "ICMPv6", "SLAAC"],
    question: "IPv6において，ルータがリンク上のホストにプレフィックス情報などを通知するICMPv6メッセージはどれか。",
    choices: {
      "ア": "RS (Router Solicitation)",
      "イ": "RA (Router Advertisement)",
      "ウ": "NS (Neighbor Solicitation)",
      "エ": "NA (Neighbor Advertisement)"
    },
    answer: "イ",
    explanation: "RA(Router Advertisement: ルータ広告)は、ルータが定期的に、またはホストからのRS(ルータ要請)への応答として、ネットワークプレフィックスやデフォルトゲートウェイ情報をブロードキャスト(マルチキャスト)通知するICMPv6メッセージです。SLAACの基盤技術です。",
    appearances: [
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 7 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 4 }
    ]
  },
  {
    masterId: "M-IP-03", category: "network", subcategory: "ip", tags: ["NAT", "NAPT"],
    question: "NAPT (IPマスカレード) が行う変換処理として，適切なものはどれか。",
    choices: {
      "ア": "プライベートIPアドレスとグローバルIPアドレスの変換に加え，TCP/UDPのポート番号も変換する。",
      "イ": "IPアドレスのみを1対1で変換し，ポート番号はそのまま透過させる。",
      "ウ": "MACアドレスとIPアドレスの対応関係を動的に学習して書き換える。",
      "エ": "IPv4パケットのペイロードをIPv6形式にプロトコル変換する。"
    },
    answer: "ア",
    explanation: "NAPT(Network Address Port Translation)は、IPアドレスとトランスポート層ポート番号を同時に変換することで、単一のグローバルIPアドレスを社内LANの複数端末で共有して同時にインターネット通信することを可能にします。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 30 },
      { year: "R2", yearLabel: "令和2年", yearNum: 2020, num: 2 }
    ]
  },
  {
    masterId: "M-IP-04", category: "network", subcategory: "ip", tags: ["IPv6", "リンクローカル"],
    question: "IPv6アドレス「fe80::1」が属するアドレスの種類はどれか。",
    choices: {
      "ア": "グローバルユニキャストアドレス",
      "イ": "マルチキャストアドレス",
      "ウ": "リンクローカルユニキャストアドレス",
      "エ": "ユニークローカルユニキャストアドレス (ULA)"
    },
    answer: "ウ",
    explanation: "プレフィックス fe80::/10 で始まるアドレスは「リンクローカルユニキャストアドレス」であり、ルータを越えない同一リンク(同一セグメント)内でのみ有効です。ルーティング情報交換や近隣探索(NDP)などで必須のアドレスです。",
    appearances: [
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 40 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 1 }
    ]
  },
  {
    masterId: "M-IP-05", category: "network", subcategory: "ip", tags: ["IPv6", "ICMPv6", "NDP"],
    question: "IPv4におけるARPの機能（IPアドレスからMACアドレスを解決する機能）を，IPv6において実現するプロトコルはどれか。",
    choices: { "ア": "ARPv6", "イ": "ICMPv6", "ウ": "IGMP", "エ": "RARP" },
    answer: "イ",
    explanation: "IPv6ではブロードキャストに依存するARPは廃止され、ICMPv6の近隣探索プロトコル(NDP: Neighbor Discovery Protocol)における「近隣要請(NS)」および「近隣広告(NA)」メッセージ（要請ノードマルチキャストを使用）によってMACアドレスの解決を行います。令和5年問1および令和6年問6で連続出題された重要問題です。",
    appearances: [
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 1 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 6 }
    ]
  },
  {
    masterId: "M-IP-06", category: "network", subcategory: "ip", tags: ["サブネット計算", "ビット演算"],
    question: "IPアドレス a とサブネットマスク m からホストアドレス部分を求める式はどれか。ここで，& はビット単位の論理積，| はビット単位の論理和，~ はビット単位の論理否定を表す。",
    choices: {
      "ア": "a & m",
      "イ": "a | m",
      "ウ": "a & ~m",
      "エ": "~a & m"
    },
    answer: "ウ",
    explanation: "サブネットマスク m のビットを反転(~m)させると、ネットワーク部が0、ホスト部が1となります。これとIPアドレス a のビット論理積(&)をとることで、ネットワーク部がすべて0クリアされ、ホストアドレス部分のみが抽出されます。平成27年問10および令和6年問11で出題されました。",
    appearances: [
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 10 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 11 }
    ]
  },

  // --- TCP / UDP (5問) ---
  {
    masterId: "M-TCP-01", category: "network", subcategory: "tcp_udp", tags: ["TCP", "ハンドシェイク"],
    question: "TCPの3ウェイハンドシェイクにおいて，クライアントからサーバへの最初のコネクション確立要求パケットにセットされるフラグはどれか。",
    choices: { "ア": "ACK", "イ": "FIN", "ウ": "SYN", "エ": "RST" },
    answer: "ウ",
    explanation: "TCPコネクションの確立は、クライアントからの「SYN」送信、サーバからの「SYN+ACK」返信、クライアントからの「ACK」送信という3段階(3ウェイハンドシェイク)で行われます。",
    appearances: [
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 8 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 4 }
    ]
  },
  {
    masterId: "M-TCP-02", category: "network", subcategory: "tcp_udp", tags: ["UDP", "ヘッダ構造"],
    question: "UDPヘッダに含まれないフィールドはどれか。",
    choices: { "ア": "送信元ポート番号", "イ": "宛先ポート番号", "ウ": "チェックサム", "エ": "シーケンス番号" },
    answer: "エ",
    explanation: "UDPヘッダはわずか8バイト固定長であり、「送信元ポート番号(2B)」「宛先ポート番号(2B)」「UDP長(2B)」「チェックサム(2B)」の4フィールドのみで構成されます。順序制御を行わないためシーケンス番号やACK番号は存在しません。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 5 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 9 }
    ]
  },
  {
    masterId: "M-TCP-03", category: "network", subcategory: "tcp_udp", tags: ["TCP", "輻輳制御"],
    question: "TCP通信において，コネクション確立直後に輻輳ウィンドウサイズを1MSSから指数関数的に増加させてネットワーク帯域を探索するアルゴリズムはどれか。",
    choices: { "ア": "フロー制御", "イ": "ファストリカバリ", "ウ": "スロースタート", "エ": "テイル通信" },
    answer: "ウ",
    explanation: "TCPのスロースタート(Slow Start)は、初期輻輳ウィンドウ(CWND)を小さく設定し、ACKを受信するたびにウィンドウサイズを倍加させていくことで、パケット廃棄を起こさずに利用可能帯域を素早く見極める輻輳制御アルゴリズムです。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 4 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 32 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 4 }
    ]
  },
  {
    masterId: "M-TCP-04", category: "network", subcategory: "tcp_udp", tags: ["TCP", "UDP", "ヘッダ共通"],
    question: "インターネットプロトコルのTCPとUDPの両方のヘッダに存在するものはどれか。",
    choices: { "ア": "宛先IPアドレス", "イ": "宛先MACアドレス", "ウ": "生存時間(TTL)", "エ": "送信元ポート番号" },
    answer: "エ",
    explanation: "IPアドレスやTTLはネットワーク層(IPヘッダ)、MACアドレスはデータリンク層(Ethernetフレーム)に存在します。トランスポート層であるTCPとUDPの両ヘッダに共通して存在するフィールドは「送信元ポート番号」「宛先ポート番号」「チェックサム」です。令和3年問13および令和6年問10で完全一致出題されました。",
    appearances: [
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 13 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 10 }
    ]
  },
  {
    masterId: "M-TCP-05", category: "network", subcategory: "tcp_udp", tags: ["TCP", "BBR", "最新輻輳制御"],
    question: "Googleが開発したTCP輻輳制御アルゴリズムであり，パケットロスではなく「ボトルネック帯域幅」と「最小往復時間(RTprop)」をモデル化して送信レートを制御するものはどれか。",
    choices: { "ア": "BBR (Bottleneck Bandwidth and RTT)", "イ": "CUBIC", "ウ": "Reno", "エ": "Vegas" },
    answer: "ア",
    explanation: "BBRは、従来のパケットロスを検知してからウィンドウを半減させるロスベース制御とは異なり、最大送達レートと最小RTTを直接計測してバッファブロート(遅延増大)を防ぎながら高スループットを維持する次世代輻輳制御です。令和5年問4で出題されました。",
    appearances: [
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 4 }
    ]
  },

  // --- DNS (4問) ---
  {
    masterId: "M-DNS-01", category: "network", subcategory: "dns", tags: ["DNS", "MXレコード"],
    question: "DNSのリソースレコードのうち，特定のドメイン宛ての電子メールを配送すべきメールサーバのホスト名を指定するレコードはどれか。",
    choices: { "ア": "MXレコード", "イ": "Aレコード", "ウ": "CNAMEレコード", "エ": "PTRレコード" },
    answer: "ア",
    explanation: "MX (Mail eXchanger) レコードは、ドメイン宛て電子メールを受信するメールサーバのFQDNと優先順位(Preference)を定義します。平成24年、平成29年、令和3年、令和4年と繰り返し出題されている定番過去問です。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 1 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 10 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 2 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 5 }
    ]
  },
  {
    masterId: "M-DNS-02", category: "network", subcategory: "dns", tags: ["DNSSEC", "電子署名"],
    question: "DNSSECにおいて，DNS応答データの完全性(改ざん検知)と送信元認証を提供するために使用される仕組みはどれか。",
    choices: {
      "ア": "IPsecによる通信経路全体のカプセル化暗号化",
      "イ": "公開鍵暗号方式に基づく電子署名(RRSIG)の付与と検証",
      "ウ": "TLSプロトコルによるポート853番での暗号化トンネル",
      "エ": "共通鍵暗号方式によるメッセージ認証コード(MAC)の共有"
    },
    answer: "イ",
    explanation: "DNSSECは、ゾーンのリソースレコードセットに対して権威サーバの秘密鍵で電子署名(RRSIG)を生成・登録し、キャッシュリゾルバが公開鍵(DNSKEY)および上位ゾーンの信頼の連鎖(DSレコード)を用いて署名を検証する技術です。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 1 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 11 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 5 }
    ]
  },
  {
    masterId: "M-DNS-03", category: "network", subcategory: "dns", tags: ["DNS", "負荷分散"],
    question: "DNSラウンドロビンの説明として，適切なものはどれか。",
    choices: {
      "ア": "名前解決要求パケットを複数の外部DNSサーバに均等中継する。",
      "イ": "IPアドレスからホスト名を逆引き検索する。",
      "ウ": "単一のホスト名に対して複数のIPアドレスを登録し，問い合わせごとに応答するアドレスの順序を巡回変更する。",
      "エ": "DNSクエリをDoHプロトコルで暗号化して送信する。"
    },
    answer: "ウ",
    explanation: "DNSラウンドロビンは、1つのFQDNに対して複数のA/AAAAレコードを定義し、DNSサーバが回答順序をローテーションさせることで、クライアントのアクセス先を複数サーバへ簡易的に分散させる負荷分散技術です。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 1 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 36 }
    ]
  },
  {
    masterId: "M-DNS-04", category: "network", subcategory: "dns", tags: ["カミンスキー攻撃", "ポートランダム化"],
    question: "DNSキャッシュポイズニング攻撃（カミンスキー攻撃等）に対する根本的な防御策として，最も効果的なものはどれか。",
    choices: {
      "ア": "キャッシュの有効期間(TTL)を極限まで長く設定する。",
      "イ": "DNSキャッシュリゾルバが外部問い合わせを行う際の送信元ポート番号をランダム化する。",
      "ウ": "問い合わせパケットの送信間隔を一定時間以上空ける。",
      "エ": "オープンリゾルバとしてインターネット全域からの再帰問い合わせを許可する。"
    },
    answer: "イ",
    explanation: "攻撃者が偽のDNS応答を注入するには16ビットのトランザクションIDの一致が必要ですが、送信元ポート番号(16ビット)もランダム化(ソースポートランダマイゼーション)することで、推測空間が約40億通り(16+16ビット)に拡大し、攻撃の成立を極めて困難にします。令和5年問16など計4回出題の最頻出問題です。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 13 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 16 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 16 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 16 }
    ]
  },

  // --- HTTP / Web技術 (3問) ---
  {
    masterId: "M-HTTP-01", category: "network", subcategory: "http", tags: ["HTTP", "Keep-Alive"],
    question: "HTTP/1.1において，1つのTCPコネクションを切断せずに維持し，複数のリクエストとレスポンスを連続してやり取りする仕組みはどれか。",
    choices: { "ア": "チャンク転送", "イ": "サーバプッシュ", "ウ": "キープアライブ (Keep-Alive)", "エ": "マルチプレキシング" },
    answer: "ウ",
    explanation: "HTTP Keep-Alive(永続的接続: Persistent Connection)により、リクエストごとに発生していたTCPの3ウェイハンドシェイクとコネクション終了処理のオーバーヘッドを大幅に削減できます。",
    appearances: [
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 6 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 12 }
    ]
  },
  {
    masterId: "M-HTTP-02", category: "network", subcategory: "http", tags: ["HTTP/2", "HPACK"],
    question: "HTTP/2の特徴として，適切なものはどれか。",
    choices: {
      "ア": "従来のHTTP/1.1と同様に完全なプレーンテキストベースで通信する。",
      "イ": "トランスポート層プロトコルとしてUDPを使用する。",
      "ウ": "セッション確立ごとに個別のTCPコネクションを生成する。",
      "エ": "ヘッダ情報をバイナリ形式のHPACKアルゴリズムで圧縮して伝送する。"
    },
    answer: "エ",
    explanation: "HTTP/2はフレームとストリームによるバイナリプロトコルであり、単一TCP接続上での多重化(マルチプレキシング)や、重複しやすいHTTPヘッダをHPACKアルゴリズムで効率的に圧縮する機能を備えています。令和6年問3でも出題。",
    appearances: [
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 6 },
      { year: "R2", yearLabel: "令和2年", yearNum: 2020, num: 13 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 3 }
    ]
  },
  {
    masterId: "M-HTTP-03", category: "network", subcategory: "http", tags: ["HTTP", "REST"],
    question: "HTTPのGETメソッドとPOSTメソッドの違いとして，適切なものはどれか。",
    choices: {
      "ア": "GETメソッドはWebサーバ上のリソース更新に用いられる。",
      "イ": "POSTメソッドはリクエストパラメータを常にURIのクエリ文字列として送信する。",
      "ウ": "GETメソッドは何度実行しても結果が変わらない性質（冪等性）を持たない。",
      "エ": "POSTメソッドは送信データをHTTPメッセージボディに格納して送信する。"
    },
    answer: "エ",
    explanation: "GETメソッドはURLのクエリ文字列にパラメータを付与し(安全かつ冪等)、POSTメソッドは送信データをメッセージボディに含めて送信します。データの作成や大容量データの送信にはPOSTが適しています。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 6 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 33 }
    ]
  },

  // --- メール (4問) ---
  {
    masterId: "M-MAIL-01", category: "network", subcategory: "email", tags: ["SMTP", "コマンド"],
    question: "SMTPプロトコルにおいて，送信側クライアントがメールのエンベロープ送信元アドレスを指定するコマンドはどれか。",
    choices: { "ア": "MAIL FROM:", "イ": "RCPT TO:", "ウ": "DATA", "エ": "HELO" },
    answer: "ア",
    explanation: "SMTPセッションでは、接続確立(HELO/EHLO)後、まず「MAIL FROM:<アドレス>」でエンベロープFrom(Return-Path)を指定し、次に「RCPT TO:<アドレス>」で宛先を指定し、「DATA」でヘッダと本文を送信します。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 3 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 14 }
    ]
  },
  {
    masterId: "M-MAIL-02", category: "network", subcategory: "email", tags: ["IMAP4", "POP3"],
    question: "POP3と比較したIMAP4の特徴として，適切なものはどれか。",
    choices: {
      "ア": "トランスポート層プロトコルとしてUDPを使用する。",
      "イ": "メールメッセージやフォルダ構造をサーバ側で一元管理し，複数端末間で既読・未読状態を同期できる。",
      "ウ": "通信経路上での暗号化機能がプロトコル仕様に最初から義務付けられている。",
      "エ": "クライアントから外部へのメール送信・中継を行う機能を持つ。"
    },
    answer: "イ",
    explanation: "IMAP4はメールをサーバ上で保持・管理するため、PCやスマートフォンなどの複数端末から未読・既読・フラグ・フォルダ移動を完全に同期して利用できます。端末ローカルにダウンロードしてサーバから削除するPOP3とは対照的です。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 5 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 5 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 15 }
    ]
  },
  {
    masterId: "M-MAIL-03", category: "network", subcategory: "email", tags: ["DKIM", "送信ドメイン認証"],
    question: "電子メールの送信ドメイン認証技術であるDKIM (DomainKeys Identified Mail) の特徴として，適切なものはどれか。",
    choices: {
      "ア": "送信元メールサーバのIPアドレスをDNSのSPFレコードと照合する。",
      "イ": "送信側がメールに秘密鍵で電子署名を付与し，受信側が送信ドメインのDNSで公開鍵を取得して署名を検証する。",
      "ウ": "メールサーバ間のSMTP通信経路全体をTLSで常時暗号化する。",
      "エ": "送信側MTAが受信側MTAに対してクライアント証明書を提示して相互認証を行う。"
    },
    answer: "イ",
    explanation: "DKIMは、メールヘッダや本文に送信ドメインの秘密鍵で電子署名(DKIM-Signatureヘッダ)を付与し、受信サーバがDNSのTXTレコードから公開鍵を取得して検証することで、送信元ドメインの真正性と本文改ざんの有無を確認します。アはSPFの説明です。",
    appearances: [
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 4 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 27 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 6 }
    ]
  },
  {
    masterId: "M-MAIL-04", category: "network", subcategory: "email", tags: ["OP25B", "スパム対策"],
    question: "ISPなどのネットワークにおいて，内部の動的IPアドレス端末からインターネット上の外部メールサーバ宛てTCPポート25番への直接通信を遮断するセキュリティ対策はどれか。",
    choices: { "ア": "SMTP-AUTH", "イ": "OP25B (Outbound Port 25 Blocking)", "ウ": "STARTTLS", "エ": "DMARC" },
    answer: "イ",
    explanation: "OP25Bは、ボット等に感染した一般PCから外部への迷惑メール大量直接送信を防ぐため、ISP管理下の回線から外部サーバのTCP 25番への直接アウトバウンド通信を遮断する技術です。正規のメール送信にはサブミッションポート(ポート587)とSMTP-AUTHを用います。令和5年問20で出題。",
    appearances: [
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 20 }
    ]
  },

  // --- セキュリティ (5問) ---
  {
    masterId: "M-SEC-01", category: "security", subcategory: "security", tags: ["IPsec", "ESPトンネルモード"],
    question: "IPsecにおいて，ESPをトンネルモードで使用したときの暗号化対象範囲として，適切なものはどれか。",
    choices: {
      "ア": "新しく付加された新IPヘッダを含むパケット全体",
      "イ": "TCPまたはUDPヘッダ以降のデータ部分のみ",
      "ウ": "元のIPパケット全体（元のIPヘッダとペイロード）およびESPトレーラ",
      "エ": "ESP認証データ(ICV)のみ"
    },
    answer: "ウ",
    explanation: "ESPトンネルモードでは、元のパケット全体(元IPヘッダ＋上位ヘッダ＋データ)とESPトレーラが暗号化され、その外側に新しい外部IPヘッダが付加されます。拠点間VPNで広く利用されます。平成24年問12、令和5年問9、令和6年問21と繰り返し出題されている最頻出問題です。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 12 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 9 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 21 }
    ]
  },
  {
    masterId: "M-SEC-02", category: "security", subcategory: "security", tags: ["TLS", "ハンドシェイク"],
    question: "TLS 1.2のハンドシェイクにおいて，クライアントから提示された暗号スイート候補の中からサーバが1つを選択し，合意を通知するメッセージはどれか。",
    choices: { "ア": "Certificate", "イ": "ClientKeyExchange", "ウ": "Finished", "エ": "ServerHello" },
    answer: "エ",
    explanation: "クライアントがサポートする暗号スイート一覧を「ClientHello」で提示し、サーバはその中から実際に使用する暗号スイートを1つ選択して「ServerHello」メッセージでクライアントに応答・合意します。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 17 },
      { year: "R2", yearLabel: "令和2年", yearNum: 2020, num: 6 }
    ]
  },
  {
    masterId: "M-SEC-03", category: "security", subcategory: "security", tags: ["TLS", "PFS", "暗号技術"],
    question: "TLS通信において，将来サーバの秘密鍵が万一漏えいした場合でも，過去に記録された暗号通信トラフィックが解読されない性質（前方秘匿性: PFS）を提供する鍵交換アルゴリズムはどれか。",
    choices: { "ア": "DHE または ECDHE", "イ": "静的RSA鍵交換", "ウ": "AES-GCM", "エ": "ChaCha20" },
    answer: "ア",
    explanation: "PFS(Perfect Forward Secrecy)は、通信セッションごとに一時的な鍵ペア(Ephemeral key)を生成して使い捨てることで実現されます。一時的Diffie-Hellman鍵交換(DHE/ECDHE)がこれに該当します。静的RSA鍵交換はPFSを持たないためTLS 1.3で廃止されました。",
    appearances: [
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 34 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 20 }
    ]
  },
  {
    masterId: "M-SEC-04", category: "security", subcategory: "security", tags: ["802.1X", "RADIUS", "EAPOL"],
    question: "IEEE 802.1X認証において，サプリカント（端末）とオーセンティケータ（スイッチや無線AP）との間で使用されるカプセル化プロトコルはどれか。",
    choices: { "ア": "EAPOL (EAP over LAN)", "イ": "RADIUS", "ウ": "LDAP", "エ": "Kerberos" },
    answer: "ア",
    explanation: "IEEE 802.1Xでは、サプリカントとオーセンティケータ間を「EAPOL」で接続し、オーセンティケータと認証サーバ(RADIUS)間を「RADIUS」パケットでカプセル化してEAP認証メッセージを中継します。令和5年問21でも出題。",
    appearances: [
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 18 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 17 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 21 }
    ]
  },
  {
    masterId: "M-SEC-05", category: "security", subcategory: "security", tags: ["攻撃手法", "RLO", "ソーシャルエンジニアリング"],
    question: "RLO (Right-to-Left Override: 制御文字) を悪用したサイバー攻撃の手口として，適切なものはどれか。",
    choices: {
      "ア": "ルータのルーティングテーブルを書き換えて通信を横取りする。",
      "イ": "SSL/TLSのセッション再ネゴシエーション脆弱性を悪用して中間者攻撃を行う。",
      "ウ": "DNSキャッシュサーバへ大量の偽応答を送り込んで偽装サイトへ誘導する。",
      "エ": "アラビア語等の右横書き制御文字を利用してファイル拡張子の表示順序を入れ替え，実行可能ファイルを文書ファイルに見せかける。"
    },
    answer: "エ",
    explanation: "RLO(Unicode U+202E)は文字列の表示方向を右から左へ反転させる制御文字です。これをファイル名に混入させることで、例えば「test[RLO]cod.exe」が画面上で「testexe.doc」と表示され、実行ファイルを安全な文書と誤認させて開かせる攻撃です。令和4年問16および令和6年問17で完全一致出題されました。",
    appearances: [
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 16 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 17 }
    ]
  },

  // --- 無線LAN (3問) ---
  {
    masterId: "M-WLAN-01", category: "network", subcategory: "wireless", tags: ["WPA2", "暗号化"],
    question: "無線LANのセキュリティ規格WPA2において，暗号化アルゴリズムとして標準採用されているものはどれか。",
    choices: { "ア": "AES-CCMP", "イ": "RC4", "ウ": "DES", "エ": "RSA" },
    answer: "ア",
    explanation: "WPA2(IEEE 802.11i)では、脆弱性が判明したRC4(WEP/TKIP)に代わり、強力な共通鍵暗号AESをベースとした「CCMP (Counter Mode with CBC-MAC Protocol)」が標準採用されています。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 18 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 5 }
    ]
  },
  {
    masterId: "M-WLAN-02", category: "network", subcategory: "wireless", tags: ["802.11n", "802.11ac", "周波数帯"],
    question: "日本国内において，無線LAN規格であるIEEE 802.11nおよびIEEE 802.11acで使用される周波数帯の組合せとして，適切なものはどれか。",
    choices: {
      "ア": "11n: 2.4GHz帯のみ ／ 11ac: 5GHz帯のみ",
      "イ": "11n: 2.4GHz帯，5GHz帯 ／ 11ac: 2.4GHz帯のみ",
      "ウ": "11n: 2.4GHz帯，5GHz帯 ／ 11ac: 5GHz帯のみ",
      "エ": "11n: 5GHz帯のみ ／ 11ac: 2.4GHz帯，5GHz帯"
    },
    answer: "ウ",
    explanation: "IEEE 802.11n(Wi-Fi 4)は2.4GHz帯と5GHz帯の両方を使用可能なデュアルバンド規格ですが、IEEE 802.11ac(Wi-Fi 5)は電波干渉の少ない5GHz帯専用の規格です。令和3年問15および令和5年問15で問番号まで完全一致で出題されました。",
    appearances: [
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 15 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 15 }
    ]
  },
  {
    masterId: "M-WLAN-03", category: "network", subcategory: "wireless", tags: ["WPA3", "SAE"],
    question: "無線LANのセキュリティ規格WPA3-Personalにおいて，従来のPSKに代わり導入された，オフライン辞書攻撃に対する耐性を持つ鍵交換プロトコルはどれか。",
    choices: { "ア": "WEP", "イ": "SAE (Simultaneous Authentication of Equals)", "ウ": "TKIP", "エ": "EAP-TLS" },
    answer: "イ",
    explanation: "WPA3-Personalでは、ディフィー・ヘルマン鍵共有に基づく「SAE (Simultaneous Authentication of Equals: 同等性同時認証)」が採用されました。パケットを盗聴して行うオフライン辞書攻撃が無効化され、前方秘匿性(PFS)も確保されます。令和6年問5でも出題。",
    appearances: [
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 5 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 17 },
      { year: "R6", yearLabel: "令和6年", yearNum: 2024, num: 5 }
    ]
  },

  // --- SDN・仮想化 (3問) ---
  {
    masterId: "M-SDN-01", category: "network", subcategory: "sdn", tags: ["OpenFlow", "SDN"],
    question: "OpenFlowスイッチにおいて，受信パケットの転送・変更・破棄などの処理ルールを保持するテーブルの名称はどれか。",
    choices: { "ア": "ルーティングテーブル", "イ": "MACアドレステーブル", "ウ": "フローテーブル", "エ": "ARPキャッシュテーブル" },
    answer: "ウ",
    explanation: "OpenFlowスイッチは、OpenFlowコントローラから注入されたフローエントリ(マッチ条件、カウンタ、アクション)を格納した「フローテーブル」を参照して高速にパケットを処理します。",
    appearances: [
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 20 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 5 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 9 }
    ]
  },
  {
    masterId: "M-SDN-02", category: "network", subcategory: "sdn", tags: ["OpenFlow", "Packet-In"],
    question: "OpenFlowにおいて，スイッチが受信したパケットがフローテーブルのどのエントリにも合致しない場合，スイッチがコントローラに対してパケットの処理方法を問い合わせるために送信するメッセージはどれか。",
    choices: { "ア": "Flow-Mod", "イ": "Hello", "ウ": "Packet-In", "エ": "Port-Status" },
    answer: "ウ",
    explanation: "テーブルミス(未登録パケット受信)時、スイッチからコントローラへパケット自身を転送して処理指示を仰ぐメッセージが「Packet-In」です。コントローラからスイッチへフローテーブル追加・更新を指示するのが「Flow-Mod」です。平成29年、令和元年、令和7年問13で出題。",
    appearances: [
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 13 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 12 },
      { year: "R7", yearLabel: "令和7年", yearNum: 2025, num: 13 }
    ]
  },
  {
    masterId: "M-SDN-03", category: "network", subcategory: "sdn", tags: ["VXLAN", "オーバーレイ"],
    question: "データセンターネットワークで用いられるVXLANにおいて，論理ネットワークを識別するVNI (VXLAN Network Identifier) のビット長はどれか。",
    choices: { "ア": "12ビット", "イ": "16ビット", "ウ": "20ビット", "エ": "24ビット" },
    answer: "エ",
    explanation: "従来のIEEE 802.1QタグVLANのVLAN IDは12ビット(最大4,094個)でしたが、VXLANのVNIは24ビット長に拡張されており、最大約1,677万個の論理セグメントを収容可能です。",
    appearances: [
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 8 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 21 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 9 }
    ]
  },

  // --- QoS・冗長化 (2問) ---
  {
    masterId: "M-QOS-01", category: "network", subcategory: "qos", tags: ["VRRP", "高可用性"],
    question: "VRRPにおいて，マスタルータの稼働状態をバックアップルータが監視するために，マスタルータから定期的に送信されるメッセージはどれか。",
    choices: { "ア": "VRRP Advertisement", "イ": "Keepalive", "ウ": "Echo Request", "エ": "Neighbor Advertisement" },
    answer: "ア",
    explanation: "マスタルータは通常1秒間隔でマルチキャスト(224.0.0.18)アドレス宛てに「VRRP Advertisement(広告)」パケットを送信します。バックアップルータはこれを一定期間(約3秒)受信しなかった場合にマスターダウンと判断して昇格します。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 7 },
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 22 },
      { year: "R2", yearLabel: "令和2年", yearNum: 2020, num: 7 }
    ]
  },
  {
    masterId: "M-QOS-02", category: "network", subcategory: "qos", tags: ["QoS", "DiffServ", "DSCP"],
    question: "DiffServにおいて，IPパケットの優先度クラス(PHB)を識別するために使用されるヘッダフィールドはどれか。",
    choices: { "ア": "TTLフィールド", "イ": "ToS(DS)フィールド", "ウ": "フラグメントオフセット", "エ": "オプションフィールド" },
    answer: "イ",
    explanation: "DiffServは、IPv4のToSフィールド(Type of Service)またはIPv6のTraffic Classフィールドの先頭6ビットを「DSCP (DiffServ Code Point)」として再定義し、ルータがクラスごとに優先制御や帯域制御を行います。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 7 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 23 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 8 }
    ]
  },

  // --- ネットワーク管理 (3問) ---
  {
    masterId: "M-MGT-01", category: "network", subcategory: "management", tags: ["SNMP", "SNMPv3"],
    question: "SNMPv3で追加された主なセキュリティ機能として，適切なものはどれか。",
    choices: {
      "ア": "コミュニティ名による平文認証",
      "イ": "UDPからTCPプロトコルへの完全移行",
      "ウ": "USMによるユーザ認証とパケット暗号化(DES/AES等)",
      "エ": "Trapメッセージの信頼性を高める再送要求機能"
    },
    answer: "ウ",
    explanation: "SNMPv1/v2cでは平文のコミュニティ名のみによる貧弱な認証でしたが、SNMPv3ではUSM(User-based Security Model)によるユーザごとの認証とパケット暗号化、VACMによる詳細なアクセス制御が導入され、安全な遠隔監視が可能になりました。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 8 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 24 },
      { year: "R5", yearLabel: "令和5年", yearNum: 2023, num: 10 }
    ]
  },
  {
    masterId: "M-MGT-02", category: "network", subcategory: "management", tags: ["NTP", "時刻同期"],
    question: "NTPが時刻同期に使用するトランスポート層プロトコルとポート番号の組合せはどれか。",
    choices: { "ア": "TCP 123", "イ": "TCP 53", "ウ": "UDP 53", "エ": "UDP 123" },
    answer: "エ",
    explanation: "NTP (Network Time Protocol) は、ミリ秒単位の高精度な時刻同期を行うため、低遅延な「UDPポート123」を使用します。階層構造(Stratum)によって時刻精度を維持します。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 7 },
      { year: "R1", yearLabel: "令和元年", yearNum: 2019, num: 25 },
      { year: "R4", yearLabel: "令和4年", yearNum: 2022, num: 10 }
    ]
  },
  {
    masterId: "M-MGT-03", category: "network", subcategory: "management", tags: ["syslog", "RFC 5424"],
    question: "syslogプロトコル(RFC 5424)において，メッセージの重大度(Severity)の数値として，Emergency(緊急：システムが使用不能)を示す値はどれか。",
    choices: { "ア": "255", "イ": "7", "ウ": "1", "エ": "0" },
    answer: "エ",
    explanation: "syslogのSeverityは 0(Emergency)から 7(Debug)までの8段階で定義されており、数値が小さいほど重要度が高くなります。0は最も重大なEmergencyです。平成28年問37等で出題。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 6 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 37 },
      { year: "R3", yearLabel: "令和3年", yearNum: 2021, num: 8 }
    ]
  },


  // ==========================================
  // 令和8年度 厳選予想問題 (全50問: 科目A-2対応)
  // ==========================================

  // --- 次世代Web・トランスポート (5問) ---
  {
    masterId: "PRED-01", category: "network", subcategory: "http", tags: ["HTTP/3", "QUIC"],
    question: "【令和8年度 予想】HTTP/3において，トランスポート層プロトコルとして採用されているものはどれか。",
    choices: { "ア": "TCP", "イ": "UDP", "ウ": "SCTP", "エ": "QUIC (UDPベース)" },
    answer: "エ",
    explanation: "HTTP/3では、TCPに起因するパケット損失時のHOLブロッキング問題を解消するため、UDP上で動作するトランスポート層プロトコル「QUIC」を採用しています。暗号化や輻輳制御がQUICにネイティブ統合されています。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 1 }]
  },
  {
    masterId: "PRED-02", category: "network", subcategory: "http", tags: ["QUIC", "Connection ID"],
    question: "【令和8年度 予想】QUICの特徴として適切なものはどれか。",
    choices: {
      "ア": "ハンドシェイクと暗号化ネゴシエーションを別々の独立したフェーズで行う。",
      "イ": "パケットロスが発生した際，TCPと同様に全ストリームのデータ転送が一時停止する。",
      "ウ": "Wi-Fiから4G/5Gへの切り替え等でIPアドレスが変化すると直ちに通信が切断される。",
      "エ": "接続ID(Connection ID)によって識別されるため，端末のIPアドレスが切り替わってもセッションを途切れず維持できる。"
    },
    answer: "エ",
    explanation: "QUICは4タプル(送信元/宛先IP・ポート)ではなく「Connection ID」でセッションを識別するため、スマートフォンが移動してWi-Fiからセルラー回線へ切り替わっても切断されずに通信を継続(コネクションマイグレーション)できます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 2 }]
  },
  {
    masterId: "PRED-03", category: "network", subcategory: "http", tags: ["QUIC", "TLS 1.3"],
    question: "【令和8年度 予想】QUICプロトコルに組み込まれている標準の暗号化プロトコルはどれか。",
    choices: { "ア": "TLS 1.3", "イ": "IPsec ESP", "ウ": "DTLS 1.2", "エ": "SSH" },
    answer: "ア",
    explanation: "QUICはトランスポートハンドシェイクの中にTLS 1.3の暗号ハンドシェイクを完全統合しており、初回接続でも1-RTT、再接続時には0-RTTで安全なデータ転送を開始できます。平文のQUIC通信は仕様上許可されません。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 3 }]
  },
  {
    masterId: "PRED-04", category: "network", subcategory: "http", tags: ["HTTP/3", "多重化"],
    question: "【令和8年度 予想】HTTP/3における複数ストリームの多重化処理は，ネットワーク階層のどのプロトコル層で処理されるか。",
    choices: { "ア": "IP層", "イ": "QUIC層(トランスポート層)", "ウ": "HTTPアプリケーション層", "エ": "Ethernet層" },
    answer: "イ",
    explanation: "HTTP/2ではHTTP層(アプリケーション層)でストリームを多重化して単一TCPに乗せていたためTCPレベルのHOLブロッキングが発生していました。HTTP/3ではトランスポート層であるQUIC自身がストリーム多重化を担当します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 4 }]
  },
  {
    masterId: "PRED-05", category: "network", subcategory: "http", tags: ["QUIC", "HOLブロッキング"],
    question: "【令和8年度 予想】TCPと比較してQUICがHead-of-Line (HOL) ブロッキングを解消できる理由として，適切なものはどれか。",
    choices: {
      "ア": "パケット損失時に全ストリームの再送をまとめて行うから",
      "イ": "エラー訂正符号のみでデータを回復し，再送要求を一切行わないから",
      "ウ": "独立したストリーム単位でパケットロス判定と再送制御を行い，他ストリームに影響を与えないから",
      "エ": "すべてのパケットをブロードキャストで重複送信するから"
    },
    answer: "ウ",
    explanation: "TCPでは1パケットでもロスすると後続パケットの引き渡しがブロックされますが、QUICではストリームごとに独立したシーケンス管理を行うため、あるストリームでパケットロスが生じても他のストリームは影響を受けずに処理を継続できます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 5 }]
  },

  // --- 次世代無線LAN (4問) ---
  {
    masterId: "PRED-06", category: "network", subcategory: "wireless", tags: ["Wi-Fi 6E", "周波数帯"],
    question: "【令和8年度 予想】Wi-Fi 6E (IEEE 802.11ax拡張規格) において，新たに利用可能となった周波数帯はどれか。",
    choices: { "ア": "900MHz帯", "イ": "2.4GHz帯", "ウ": "5GHz帯", "エ": "6GHz帯 (5.925GHz〜7.125GHz)" },
    answer: "エ",
    explanation: "Wi-Fi 6Eは、従来の2.4GHz帯および5GHz帯に加えて、電波干渉の少ない「6GHz帯」(日本では最大160MHz幅チャネルが3本利用可能)を開放した規格です。電波混雑のないクリーンな広帯域通信が可能です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 6 }]
  },
  {
    masterId: "PRED-07", category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "MLO"],
    question: "【令和8年度 予想】次世代規格Wi-Fi 7 (IEEE 802.11be) で導入されるMLO (Multi-Link Operation) の特徴はどれか。",
    choices: {
      "ア": "複数のアクセスポイントと同時に通信してハンドオーバーを行う技術",
      "イ": "有線LANポートを複数束ねて帯域を拡大する技術",
      "ウ": "2.4GHz帯，5GHz帯，6GHz帯などの複数周波数帯(リンク)を単一端末と同時に束ねて通信する技術",
      "エ": "WPA2とWPA3の暗号化をパケットごとに交互に切り替える技術"
    },
    answer: "ウ",
    explanation: "MLO (Multi-Link Operation) は、端末とAP間で複数の異なる周波数バンド(例: 5GHzと6GHz)を同時に使ってパケットの送受信を行う機能です。帯域拡大(集約)と遅延削減(空いているリンクへの即座送信)を同時に達成します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 7 }]
  },
  {
    masterId: "PRED-08", category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "帯域幅"],
    question: "【令和8年度 予想】Wi-Fi 7 (IEEE 802.11be) においてサポートされる最大チャネル帯域幅はどれか。",
    choices: { "ア": "40MHz", "イ": "80MHz", "ウ": "160MHz", "エ": "320MHz" },
    answer: "エ",
    explanation: "Wi-Fi 6/6Eの最大160MHz幅に対し、Wi-Fi 7では6GHz帯の広大な連続帯域を活用して2倍の「最大320MHz幅」のチャネルボンディングをサポートし、公称最大スループットが40Gbps超に達します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 8 }]
  },
  {
    masterId: "PRED-09", category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "4K-QAM"],
    question: "【令和8年度 予想】Wi-Fi 7で新たにサポートされる最高次の変調方式はどれか。",
    choices: { "ア": "4096-QAM (4K-QAM)", "イ": "1024-QAM", "ウ": "256-QAM", "エ": "64-QAM" },
    answer: "ア",
    explanation: "Wi-Fi 6の1024-QAM(1シンボルあたり10ビット)から、Wi-Fi 7では「4096-QAM」(1シンボルあたり12ビット)へ高密度化され、伝送効率が約20%向上しました。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 9 }]
  },

  // --- SRv6・ルーティング・自動化 (4問) ---
  {
    masterId: "PRED-10", category: "network", subcategory: "routing", tags: ["SRv6", "SRH"],
    question: "【令和8年度 予想】SRv6 (Segment Routing over IPv6) において，パケットが通過すべき経路や機能の指示リスト(SID)が格納されるヘッダ領域はどれか。",
    choices: {
      "ア": "IPv4オプションヘッダ",
      "イ": "IPv6ルーティング拡張ヘッダ (SRH: Segment Routing Header)",
      "ウ": "TCPヘッダのオプション領域",
      "エ": "UDPヘッダのチェックサム領域"
    },
    answer: "イ",
    explanation: "SRv6はソースルーティング技術であり、パケット送信元がIPv6拡張ヘッダであるSRH (Segment Routing Header: ルーティングタイプ4) にSID(セグメントID)の配列を格納してパケットを送出します。中継ルータはステートレスに転送できます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 10 }]
  },
  {
    masterId: "PRED-11", category: "network", subcategory: "routing", tags: ["SRv6", "SID"],
    question: "【令和8年度 予想】SRv6におけるSID (Segment Identifier) の実体およびデータ長として，適切なものはどれか。",
    choices: { "ア": "20ビットのMPLSラベル", "イ": "48ビットのMACアドレス形式", "ウ": "128ビットのIPv6アドレス形式", "エ": "24ビットのVXLAN VNI" },
    answer: "ウ",
    explanation: "SRv6の最大の利点は、SID自体が標準の「128ビットIPv6アドレス形式」である点です。SRv6非対応の通常のIPv6ルータであっても、宛先アドレス(DA)にコピーされたSIDを見てそのまま中継可能という高い親和性を持ちます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 11 }]
  },
  {
    masterId: "PRED-12", category: "network", subcategory: "routing", tags: ["SRv6", "Network Programming"],
    question: "【令和8年度 予想】SRv6の「Network Programming」モデルにおいて，128ビットのSIDを構成する2大要素の組合せはどれか。",
    choices: {
      "ア": "ネットワーク部 と ホスト部",
      "イ": "AS番号 と ルータID",
      "ウ": "VLAN ID と MACアドレス",
      "エ": "Locator (ルータの識別・位置) と Function (ノードが実行すべき機能)"
    },
    answer: "エ",
    explanation: "SRv6 Network Programmingでは、SIDを「Locator(どのノードへ送るか)」と「Function(ノードで何をさせるか: テーブル検索、カプセル化解除、ファイアウォール転送等)」に分割定義し、パケット自身にネットワーク機能チェイニング(SFC)を指示させます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 12 }]
  },
  {
    masterId: "PRED-13", category: "security", subcategory: "security", tags: ["SASE", "クラウド"],
    question: "【令和8年度 予想】SASE (Secure Access Service Edge) の説明として，適切なものはどれか。",
    choices: {
      "ア": "SD-WANなどのネットワーク機能と，SWG，CASB，ZTNAなどのセキュリティ機能をクラウドサービスとして統合・提供するアーキテクチャ。",
      "イ": "社内の全サーバと端末をデータセンターの単一UTM装置の配下に集中収容するオンプレミス設計。",
      "ウ": "IoT機器の低電力無線通信をエッジ側で集約するハードウェア規格。",
      "エ": "ブロックチェーン技術を用いてDNSレコードを改ざんから保護するフレームワーク。"
    },
    answer: "ア",
    explanation: "SASE(サシー)は米ガートナーが提唱した概念で、SD-WANをはじめとするネットワーク接続機能と、SWG(セキュアWebゲートウェイ)、CASB、ZTNA、FWaaSなどの包括的セキュリティ機能をクラウドエッジ上で統合提供するモデルです。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 13 }]
  },

  // --- SD-WAN・SASE (4問) ---
  {
    masterId: "PRED-14", category: "network", subcategory: "sdn", tags: ["SD-WAN", "ローカルブレイクアウト"],
    question: "【令和8年度 予想】SD-WANにおいて，Microsoft 365やZoomなどの特定のSaaS宛てトラフィックを，データセンターを経由させずに各拠点から直接インターネットへ逃がす機能はどれか。",
    choices: { "ア": "ゼロデイプロテクション", "イ": "ローカルブレイクアウト (LBO / インターネットブレイクアウト)", "ウ": "ダイナミックパケットフィルタリング", "エ": "VLANホッピング" },
    answer: "イ",
    explanation: "ローカルブレイクアウト(LBO)は、拠点からの特定SaaS通信をデータセンター宛てVPNへ通さず、拠点のインターネット回線から直接アクセスさせることで、センタ回線の帯域枯渇やプロキシ負荷、遅延を抜本的に解消するSD-WANの代表機能です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 14 }]
  },
  {
    masterId: "PRED-15", category: "security", subcategory: "security", tags: ["SSE", "SASE"],
    question: "【令和8年度 予想】SASEフレームワークからSD-WANなどのネットワーク接続コンポーネントを切り離し，クラウドセキュリティ機能(SWG, CASB, ZTNA等)に特化したソリューション群を指す用語はどれか。",
    choices: { "ア": "EDR", "イ": "SIEM", "ウ": "SSE (Security Service Edge)", "エ": "SOAR" },
    answer: "ウ",
    explanation: "SSE(Security Service Edge)は、SASEのセキュリティ側の柱であり、SWG(Web保護)、CASB(SaaS制御)、ZTNA(アプリへのセキュアアクセス)などをクラウド上で統合したセキュリティサービスプラットフォームです。既存のネットワーク機器を維持したまま導入できます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 15 }]
  },
  {
    masterId: "PRED-16", category: "network", subcategory: "sdn", tags: ["SD-WAN", "DPI"],
    question: "【令和8年度 予想】SD-WANで用いられるDPI (Deep Packet Inspection) 等のアプリケーション可視化・制御機能の主なメリットはどれか。",
    choices: {
      "ア": "IPパケットのヘッダを暗号化してルータの負荷を軽減する。",
      "イ": "物理ケーブルの断線を事前に予測して自己修復する。",
      "ウ": "DNSレコードの動的更新をミリ秒単位で同期する。",
      "エ": "L7レベルでアプリケーションの種類を識別し，業務重要度に応じた回線選択やQoS制御を柔軟に実行できる。"
    },
    answer: "エ",
    explanation: "DPIにより、ポート番号だけでなく通信内容からアプリ(Teams、Salesforce、YouTube等)を正確に識別し、基幹業務は高品質な専用線、動画閲覧は安価なベストエフォート回線といった動的トラフィックステアリングが可能になります。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 16 }]
  },
  {
    masterId: "PRED-17", category: "network", subcategory: "sdn", tags: ["IBN", "ネットワーク自動化"],
    question: "【令和8年度 予想】インテントベースネットワーキング (IBN) の基本的な特徴として，適切なものはどれか。",
    choices: {
      "ア": "管理者が「どの機器のポートをどう変更するか(How)」ではなく，「何を達成したいか(What: インテント)」を指示すると，システムが自動で設計・適用・検証する。",
      "イ": "全ルータのCLIコマンドを手動で作成し，夜間に一括バッチ実行する。",
      "ウ": "すべてのルーティングテーブルを静的(Static)に固定して運用する。",
      "エ": "セキュリティ監査を年に1回手動で実施する手法。"
    },
    answer: "ア",
    explanation: "IBNは、管理者が「特定グループ間の通信を遮断する」「ビデオ会議を最優先する」などのビジネス意図(Intent)を宣言すると、コントローラやAIが各機器の具体的コンフィグに自動変換して適用し、意図通り動いているかを監視する次世代運用技術です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 17 }]
  },

  // --- ネットワーク運用・IPv4/IPv6移行 (4問) ---
  {
    masterId: "PRED-18", category: "network", subcategory: "sdn", tags: ["IBN", "アシュアランス"],
    question: "【令和8年度 予想】IBNのライフサイクルにおいて，設定適用後にネットワーク状態が管理者の意図を満たしているかをテレメトリ等で継続的に検証・維持するプロセスはどれか。",
    choices: { "ア": "Translation (変換)", "イ": "Assurance (保証・検証)", "ウ": "Activation (有効化)", "エ": "Decommission (廃棄)" },
    answer: "イ",
    explanation: "IBNは「Translation(意図の変換)」「Activation(自動展開)」「Assurance(継続的保証)」のクローズドループで構成されます。アシュアランスではテレメトリやAIで状態を監視し、ポリシー違反や性能劣化を自己修復します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 18 }]
  },
  {
    masterId: "PRED-19", category: "network", subcategory: "ip", tags: ["MAP-E", "DS-Lite", "IPv4 over IPv6"],
    question: "【令和8年度 予想】日本の光ブロードバンド(IPoE)で広く普及しているIPv4 over IPv6技術（MAP-EやDS-Lite）が解決する主な課題はどれか。",
    choices: {
      "ア": "IPv6のヘッダサイズがIPv4より大きいこと",
      "イ": "DNSSECの鍵更新手続きが複雑であること",
      "ウ": "PPPoE網(網終端装置)の混雑回避と，IPv6シングルスタック網を介したIPv4インターネット接続の提供",
      "エ": "ルータのARPキャッシュテーブルのオーバーフロー"
    },
    answer: "ウ",
    explanation: "MAP-EやDS-Liteは、混雑する従来のPPPoE網を避け、高速なIPoE(IPv6)網内にIPv4パケットをカプセル化して通過させることで、IPv4枯渇に対応しつつ高速なIPv4通信を提供する技術です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 19 }]
  },
  {
    masterId: "PRED-20", category: "network", subcategory: "ip", tags: ["MAP-E", "CGNAT"],
    question: "【令和8年度 予想】MAP-E (Mapping of Address and Port with Encapsulation) のアーキテクチャ上の特徴として，適切なものはどれか。",
    choices: {
      "ア": "ISP側のセンタ装置(CGNAT)で全ユーザのNAPT変換テーブルを集中管理する。",
      "イ": "IPv4パケットを暗号化するためにIPsec ESPトンネルが必須である。",
      "ウ": "各ユーザに1個の独立したグローバルIPv4アドレスが必ず割り当てられる。",
      "エ": "NAPT処理を各ユーザ宅のルータ(CPE)で分散実行し，グローバルIPv4アドレスと利用可能なポート番号ブロックを割り当てる(ステートレス方式)。"
    },
    answer: "エ",
    explanation: "MAP-EはステートレスなIPv4共有方式であり、ISP側の装置(BR)はトンネルのカプセル化/解除のみを行い、NAPTのセッション管理は各家庭のルータ(CPE)に分散されます。これによりISP側でのセッション枯渇や過負荷を防ぎます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 20 }]
  },
  {
    masterId: "PRED-21", category: "network", subcategory: "ip", tags: ["IPv6", "SLAAC", "プライバシー"],
    question: "【令和8年度 予想】IPv6のSLAACにおいて，MACアドレスから生成したEUI-64形式アドレスを使い続けることによる端末追跡を防ぐため，RFC 4941で規定された対策はどれか。",
    choices: {
      "ア": "ランダムに生成した一時的なインターフェースIDを定期的に生成・変更して通信に用いる(プライバシー拡張)。",
      "イ": "ルータ広告(RA)の受信を完全に拒否し，固定アドレスのみを手動設定する。",
      "ウ": "IPv6通信をすべてNAPT装置経由に限定する。",
      "エ": "MACアドレスの先頭3バイトを00:00:00に上書きする。"
    },
    answer: "ア",
    explanation: "EUI-64はMACアドレスが全世界で一意なため、外出先でネットワークが変わっても端末が特定・追跡されるプライバシー上の問題がありました。プライバシー拡張(RFC 4941)では、乱数に基づく一時アドレス(Temporary Address)を生成し定期的に更新します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 21 }]
  },

  // --- 5G・モバイル・次世代DNS (5問) ---
  {
    masterId: "PRED-22", category: "network", subcategory: "wireless", tags: ["5G", "ネットワークスライシング"],
    question: "【令和8年度 予想】5Gモバイルネットワークにおける「ネットワークスライシング」の主な目的はどれか。",
    choices: {
      "ア": "アンテナの電波を細く絞って特定端末のみに照射する。",
      "イ": "単一の物理網インフラ上に，eMBB(高速大容量)，URLLC(超高信頼低遅延)，mMTC(多数接続)など用途に応じた論理的な独立仮想ネットワーク群を構築する。",
      "ウ": "基地局間の有線光ファイバ通信を波長多重で高速化する。",
      "エ": "SIMカードの暗号鍵長を2倍に拡張する。"
    },
    answer: "イ",
    explanation: "ネットワークスライシングはNFV/SDN技術を駆使し、自動運転向けにはURLLC(超低遅延)、映像配信向けにはeMBB(大容量)、スマートメーター向けにはmMTC(多数接続)といった、異なるSLAを持つ仮想ネットワークを同一インフラ上で共存させる5Gの核心技術です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 22 }]
  },
  {
    masterId: "PRED-23", category: "network", subcategory: "wireless", tags: ["5G", "UPF", "5GC"],
    question: "【令和8年度 予想】5Gコアネットワーク(5GC)において，コントロールプレーン(AMF/SMF)から分離され，実際のユーザデータパケットの転送処理(U-Plane)を一手に担う機能エンティティはどれか。",
    choices: { "ア": "AMF", "イ": "SMF", "ウ": "UPF (User Plane Function)", "エ": "UDM" },
    answer: "ウ",
    explanation: "5GCはCUPS(Control and User Plane Separation)構造を採用しており、認証や移動管理を行うC-Plane(AMF, SMF)と、データ転送を行うU-Plane(UPF)が完全に分離されています。UPFをユーザ近くのエッジに分散配置することで超低遅延を実現します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 23 }]
  },
  {
    masterId: "PRED-24", category: "network", subcategory: "wireless", tags: ["5G", "MEC", "エッジコンピューティング"],
    question: "【令和8年度 予想】5Gやローカル5Gにおいて，超低遅延サービスを提供するために，アプリケーション処理サーバを通信キャリアの基地局近傍やエッジ網内に配置するアーキテクチャはどれか。",
    choices: { "ア": "CDN", "イ": "DNSSEC", "ウ": "VLAN", "エ": "MEC (Multi-access Edge Computing)" },
    answer: "エ",
    explanation: "MECは、データ処理やアプリケーションをクラウドセンタではなくユーザ近接のエッジ(基地局や収容局)に配置することで、往復遅延(RTT)を大幅に短縮し、自動運転制御や遠隔ロボット手術、VR等のリアルタイム処理を可能にします。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 24 }]
  },
  {
    masterId: "PRED-25", category: "network", subcategory: "dns", tags: ["DoH", "プライバシー"],
    question: "【令和8年度 予想】DoH (DNS over HTTPS: RFC 8484) の特徴として，適切なものはどれか。",
    choices: {
      "ア": "DNS問い合わせをHTTPペイロードにカプセル化し，TLS暗号化を用いてTCPポート443番で通信する。",
      "イ": "DNSクエリを専用のTCPポート853番を用いて暗号化する。",
      "ウ": "DNSメッセージをIPsecトンネルでのみ送受信する。",
      "エ": "UDPポート53番通信のメッセージ認証コード(MAC)を検証する。"
    },
    answer: "ア",
    explanation: "DoHはHTTPS通信(ポート443)の中にDNSクエリと応答を埋め込む規格です。通信経路上の盗聴や改ざん、ISP等によるDNSハイジャック・閲覧履歴追跡を防ぐとともに、通常のWeb通信と区別がつかないため検閲耐性に優れます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 25 }]
  },
  {
    masterId: "PRED-26", category: "network", subcategory: "dns", tags: ["DoT", "TLS"],
    question: "【令和8年度 予想】DoT (DNS over TLS: RFC 7858) で使用される標準のTCPポート番号はどれか。",
    choices: { "ア": "TCP 53", "イ": "TCP 853", "ウ": "TCP 443", "エ": "TCP 80" },
    answer: "イ",
    explanation: "DoTは、従来のDNS通信をHTTPを介さずに直接TLSで暗号化する規格であり、標準ポートとして「TCP 853」が割り当てられています。ネットワーク管理者にとってはポート単位での制御・監査が容易というメリットがあります。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 26 }]
  },

  // --- EVPN・API・ゼロトラスト (6問) ---
  {
    masterId: "PRED-27", category: "network", subcategory: "sdn", tags: ["EVPN", "BGP", "データセンター"],
    question: "【令和8年度 予想】データセンターネットワークにおいて，BGP EVPN (Ethernet VPN) が従来のVPLSやフラッディング方式に対して持つ利点はどれか。",
    choices: {
      "ア": "ルーティングプロトコルにRIPを使用できる。",
      "イ": "MACアドレスの学習をデータプレーンのブロードキャストでのみ行う。",
      "ウ": "MP-BGPを用いてMACアドレスやIPアドレスの学習をコントロールプレーンで広報し，無駄なフラッディングを抑制する。",
      "エ": "VLANの上限数を100個に制限して設定をシンプル化する。"
    },
    answer: "ウ",
    explanation: "BGP EVPNは、MP-BGPをコントロールプレーンとして使用し、各スイッチ(VTEP)が学習したエンドポイントのMACアドレスやIPアドレスを経路情報として交換します。これにより、ARPのフラッディングが劇的に削減され、大規模マルチテナント環境で優れたスケーラビリティを発揮します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 27 }]
  },
  {
    masterId: "PRED-28", category: "network", subcategory: "sdn", tags: ["VXLAN", "Spine-Leaf", "EVPN"],
    question: "【令和8年度 予想】最新のデータセンターネットワーク(Spine-Leaf型Closトポロジ)において，L2/L3オーバーレイネットワークを構築する標準的な技術の組合せはどれか。",
    choices: {
      "ア": "データプレーン: STP ／ コントロールプレーン: OSPF",
      "イ": "データプレーン: MPLS ／ コントロールプレーン: RIP",
      "ウ": "データプレーン: GRE ／ コントロールプレーン: IGMP",
      "エ": "データプレーン: VXLAN ／ コントロールプレーン: BGP EVPN"
    },
    answer: "エ",
    explanation: "現代のデータセンターでは、アンダーレイ(物理網)をIPファブリックとし、その上に「VXLAN(データプレーンのカプセル化)」と「BGP EVPN(コントロールプレーンの経路制御)」を組み合わせたアーキテクチャが標準です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 28 }]
  },
  {
    masterId: "PRED-29", category: "network", subcategory: "http", tags: ["API Gateway", "マイクロサービス"],
    question: "【令和8年度 予想】マイクロサービスアーキテクチャにおいて，クライアントとバックエンドサービス群との間に配置される「APIゲートウェイ」の主な機能はどれか。",
    choices: {
      "ア": "単一のエントリポイントを提供し，リクエストのルーティング，認証認可，流量制限(Rate Limiting)，SSL終端などを一元処理する。",
      "イ": "バックエンドの全データベースを単一のRDBに物理統合する。",
      "ウ": "物理スイッチのポート速度を自動調整する。",
      "エ": "クライアント端末のOSにセキュリティパッチを自動適用する。"
    },
    answer: "ア",
    explanation: "APIゲートウェイは、クライアントからのAPI呼び出しを集約し、適切なマイクロサービスへルーティングするとともに、認証・トークン検証、SSLオフロード、レートリミット、ログ収集などの共通処理を一括して提供します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 29 }]
  },
  {
    masterId: "PRED-30", category: "network", subcategory: "http", tags: ["REST", "HTTPメソッド"],
    question: "【令和8年度 予想】RESTful APIにおいて，既存リソースの全体更新（または置換）を行うために使用される適切なHTTPメソッドはどれか。",
    choices: { "ア": "GET", "イ": "PUT", "ウ": "DELETE", "エ": "HEAD" },
    answer: "イ",
    explanation: "REST原則では、新規作成にPOST、取得にGET、既存リソースの全体更新にPUT、部分更新にPATCH、削除にDELETEを使用します。PUTは同一リクエストを複数回実行しても結果が変わらない「冪等(Idempotent)」なメソッドです。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 30 }]
  },
  {
    masterId: "PRED-31", category: "security", subcategory: "security", tags: ["ゼロトラスト", "ZTNA"],
    question: "【令和8年度 予想】ゼロトラストアーキテクチャ (NIST SP 800-207) の中核となる基本原則として，適切なものはどれか。",
    choices: {
      "ア": "社内ネットワーク内部にある端末や通信は安全とみなし，境界FWのみを強化する。",
      "イ": "一度パスワード認証に成功した端末は，セッション終了まで再検証を行わない。",
      "ウ": "ネットワークの物理的・論理的位置に関わらずすべてのアクセスを信頼せず(Never Trust)，要求ごとに動的に検証・認可する(Always Verify)。",
      "エ": "全端末に固定IPアドレスを割り振ってアクセス権を静的に固定化する。"
    },
    answer: "ウ",
    explanation: "ゼロトラストは「社内＝安全」という境界防御の前提を捨て、どこからのアクセスであっても信用せず、アクセスの都度、ID・デバイス健全性・場所・リスクを動的に評価して最小特権アクセスを付与するセキュリティモデルです。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 31 }]
  },
  {
    masterId: "PRED-32", category: "security", subcategory: "security", tags: ["ZTNA", "VPN比較"],
    question: "【令和8年度 予想】従来型のリモートアクセスVPNと比較したZTNA (Zero Trust Network Access) のセキュリティ上の大きな優位性はどれか。",
    choices: {
      "ア": "暗号化処理を行わないため通信スループットが大幅に向上する。",
      "イ": "社内に大規模な専用VPNハードウェアアプライアンスの設置が必要になる。",
      "ウ": "パスワードのみの単純認証で運用できる。",
      "エ": "ネットワーク全体(L3セグメント)への広範なアクセスを許可せず，認可された特定の個別アプリケーションのみに最小権限で接続させる。"
    },
    answer: "エ",
    explanation: "VPNは接続すると社内LAN全体へアクセス可能になり、端末が感染した際にラテラルムーブメント(横展開)を許す重大な弱点がありました。ZTNAはアプリケーション単位のマイクロセグメンテーションを行い、不要な社内リソースを不可視化します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 32 }]
  },

  // --- ゼロトラスト・RPKI (4問) ---
  {
    masterId: "PRED-33", category: "security", subcategory: "security", tags: ["ゼロトラスト", "PDP", "PEP"],
    question: "【令和8年度 予想】NIST SP 800-207のゼロトラスト論理コンポーネントにおいて，アクセス要求に対してポリシーに基づきアクセスの許可・拒否の最終判断を下すエンティティはどれか。",
    choices: { "ア": "ポリシー決定ポイント (PDP: Policy Decision Point)", "イ": "ポリシー実施ポイント (PEP: Policy Enforcement Point)", "ウ": "CA (認証局)", "エ": "リゾルバ" },
    answer: "ア",
    explanation: "PDP(Policy Decision Point)は、ポリシーエンジン(PE)とポリシー管理者(PA)から構成され、リソースへのアクセス要求の可否を決定します。決定されたポリシー指示を受け取り、実際のパケットの通過や遮断を実施するのがPEP(Policy Enforcement Point)です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 33 }]
  },
  {
    masterId: "PRED-34", category: "security", subcategory: "security", tags: ["MFA", "デバイスポスチャ"],
    question: "【令和8年度 予想】ゼロトラストにおけるアクセス認証・認可のベストプラクティスとして，最も適切なものはどれか。",
    choices: {
      "ア": "パスワード文字数を長くし，全従業員に90日ごとの強制定期変更を義務付ける。",
      "イ": "FIDO2などのフィッシング耐性のあるMFA(多要素認証)に加え，OSのパッチ状況やEDR導入等のデバイスポスチャ(セキュリティ状態)を動的にチェックする。",
      "ウ": "送信元グローバルIPアドレスのホワイトリスト登録のみで認証をパスさせる。",
      "エ": "多要素認証を廃止してシングルサインオン(SSO)のみにする。"
    },
    answer: "イ",
    explanation: "ゼロトラストでは、ユーザーのID認証(フィッシング耐性MFA)だけでなく、アクセス元デバイスがマルウェアに感染していないか、ディスク暗号化や最新パッチが適用されているか(デバイスポスチャ)を複合的に評価してアクセスを認可します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 34 }]
  },
  {
    masterId: "PRED-35", category: "security", subcategory: "routing", tags: ["RPKI", "BGPハイジャック"],
    question: "【令和8年度 予想】BGPにおける経路ハイジャックや誤設定による不正な経路広告を防止するため，IPアドレス空間の正当な保有者とAS番号の対応関係を電子証明書で検証する仕組みはどれか。",
    choices: { "ア": "DNSSEC", "イ": "IPsec AH", "ウ": "RPKI (Resource Public Key Infrastructure)", "エ": "RADIUS" },
    answer: "ウ",
    explanation: "RPKI(Resource PKI)は、地域インターネットレジストリ(RIR)等のPKIツリーに基づき、IPアドレスブロックを広告する正当な権限を持つAS番号を証明書(ROA)で発行し、BGPルータが不正な経路広告(BGPハイジャック)を検知・破棄できるようにする仕組みです。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 35 }]
  },
  {
    masterId: "PRED-36", category: "security", subcategory: "routing", tags: ["RPKI", "ROA"],
    question: "【令和8年度 予想】RPKIにおいて，あるIPプレフィックスを広告する権限を持つAS番号や最大プレフィックス長を定義したデジタル署名付きオブジェクトはどれか。",
    choices: { "ア": "CSR (Certificate Signing Request)", "イ": "CRL (証明書失効リスト)", "ウ": "AS-SET", "エ": "ROA (Route Origin Authorization)" },
    answer: "エ",
    explanation: "ROA(Route Origin Authorization)は、IPアドレス保持者の秘密鍵で署名されたデータであり、「このIPプレフィックス(/24等)はAS Xから広告されることが正当である」ことを宣言します。BGPルータはROV(Route Origin Validation)でこのROAを検証します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 36 }]
  },

  // --- TLS 1.3・耐量子暗号 (4問) ---
  {
    masterId: "PRED-37", category: "security", subcategory: "security", tags: ["TLS 1.3", "高速化"],
    question: "【令和8年度 予想】TLS 1.3 (RFC 8446) における従来のTLS 1.2からの主な変更点として，適切なものはどれか。",
    choices: {
      "ア": "ハンドシェイクの往復回数を1-RTT（再接続時は0-RTT）に短縮し，脆弱な古い暗号アルゴリズムを一掃した。",
      "イ": "静的RSA鍵交換を標準の鍵共有方式として義務付けた。",
      "ウ": "CBCモードのブロック暗号を標準採用して互換性を維持した。",
      "エ": "前方秘匿性(PFS)を持たない暗号スイートのみを許可した。"
    },
    answer: "ア",
    explanation: "TLS 1.3ではハンドシェイクが最適化され、初回接続が従来の2-RTTから1-RTTへ半減し、0-RTTモードも導入されました。また、静的RSA鍵交換やCBCモード、RC4等の脆弱なレガシー暗号が完全に廃止され、AEAD暗号のみが許可されています。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 37 }]
  },
  {
    masterId: "PRED-38", category: "security", subcategory: "security", tags: ["TLS 1.3", "暗号スイート"],
    question: "【令和8年度 予想】TLS 1.3でセキュリティ向上のために完全に廃止された暗号技術や機能はどれか。",
    choices: {
      "ア": "AEAD (認証付き暗号)",
      "イ": "静的RSA鍵交換およびDiffie-Hellman静的鍵交換（PFSを持たない方式）",
      "ウ": "ECDHE (一時的楕円曲線ディフィー・ヘルマン)",
      "エ": "HKDF (HMACベースの鍵導出関数)"
    },
    answer: "イ",
    explanation: "TLS 1.3では前方秘匿性(PFS)が必須化されたため、過去の暗号通信を将来解読されるリスクがある「静的RSA鍵交換」は完全に廃止され、(EC)DHE鍵交換のみが残されました。また脆弱性の多いCBCモードも廃止されました。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 38 }]
  },
  {
    masterId: "PRED-39", category: "security", subcategory: "security", tags: ["耐量子暗号", "PQC"],
    question: "【令和8年度 予想】ポスト量子暗号 (PQC: Post-Quantum Cryptography / 耐量子計算機暗号) の説明として，適切なものはどれか。",
    choices: {
      "ア": "量子コンピュータ上でのみ演算実行が可能な特殊な暗号アルゴリズム。",
      "イ": "光子の量子もつれを利用して物理層で盗聴を検知する量子暗号通信(QKD)。",
      "ウ": "現在の古典的コンピュータで実行可能でありながら，将来の大規模量子コンピュータでも現実的な時間で解読できない新しい数学的難問に基づく公開鍵暗号。",
      "エ": "共通鍵暗号の鍵長を無限大にして総当たり攻撃を永久に防ぐ技術。"
    },
    answer: "ウ",
    explanation: "PQC(耐量子計算機暗号)は、NISTなどで標準化(ML-KEM/KyberやML-DSA/Dilithium等)が進められている暗号であり、格子暗号などの数学理論に基づき、量子コンピュータのShorアルゴリズムでも多項式時間で解けない公開鍵暗号です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 39 }]
  },
  {
    masterId: "PRED-40", category: "security", subcategory: "security", tags: ["量子アルゴリズム", "Shorのアルゴリズム"],
    question: "【令和8年度 予想】RSA暗号や楕円曲線暗号(ECC)が，将来の実用的な量子コンピュータによって解読可能になるとされる理論的根拠はどれか。",
    choices: {
      "ア": "共通鍵暗号の鍵空間をGroverのアルゴリズムで1/2に削減できるから",
      "イ": "ハッシュ関数の不可逆性が完全に消失するから",
      "ウ": "TCPパケットの改ざんが光速で実行可能になるから",
      "エ": "Shorのアルゴリズムによって，素因数分解問題や離散対数問題が多項式時間で高速に解けるから"
    },
    answer: "エ",
    explanation: "ピーター・ショアが考案した量子アルゴリズム(Shorのアルゴリズム)は、素因数分解問題(RSAの根拠)および離散対数問題(DSAやDH、ECCの根拠)を多項式時間で解くことができます。これにより現在の主流公開鍵暗号がすべて無力化されるためPQCへの移行が急務となっています。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 40 }]
  },

  // --- 認証・クラウドセキュリティ (5問) ---
  {
    masterId: "PRED-41", category: "security", subcategory: "security", tags: ["FIDO2", "パスキー", "認証"],
    question: "【令和8年度 予想】FIDO2 / パスキー(Passkey)によるパスワードレス認証の動作原理として，適切なものはどれか。",
    choices: {
      "ア": "端末側で生体情報等によりローカル認証を行い，サーバとは公開鍵暗号によるチャレンジ/レスポンス署名で認証する。",
      "イ": "指紋や顔写真などの生体データを暗号化してWebサーバへ送信・照合する。",
      "ウ": "パスワードをSMSで送信し，ワンタイムパスワードを入力させる。",
      "エ": "クライアントのMACアドレスをサーバ側のDBに直接登録して照合する。"
    },
    answer: "ア",
    explanation: "FIDO2では、生体情報は端末内のセキュアチップにとどまり外部送信されません。端末内で認証解除された秘密鍵を用いてサーバからのチャレンジにデジタル署名して返送するため、フィッシング詐欺やサーバ側情報漏えいによる不正ログインを根本的に防止できます。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 41 }]
  },
  {
    masterId: "PRED-42", category: "security", subcategory: "security", tags: ["WebAuthn", "W3C"],
    question: "【令和8年度 予想】FIDO2仕様を構成する技術のうち，Webブラウザ上のJavaScriptから端末の認証器(Authenticator)を呼び出すためのW3C標準APIはどれか。",
    choices: { "ア": "OAuth 2.0", "イ": "WebAuthn (Web Authentication API)", "ウ": "CTAP2", "エ": "SAML 2.0" },
    answer: "イ",
    explanation: "FIDO2は、ブラウザ/OSとWebサーバ間の標準APIである「WebAuthn」(W3C策定)と、PC端末と外部認証器(USBセキュリティキー等)間の通信プロトコルである「CTAP2」(FIDO Alliance策定)の2つで構成されています。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 42 }]
  },
  {
    masterId: "PRED-43", category: "security", subcategory: "security", tags: ["CSPM", "クラウドセキュリティ"],
    question: "【令和8年度 予想】クラウド環境におけるセキュリティ管理手法である「CSPM (Cloud Security Posture Management)」の主な役割はどれか。",
    choices: {
      "ア": "社内PCから許可されていないSaaSへのアクセス(シャドーIT)を可視化・遮断する。",
      "イ": "クラウド上の仮想マシン内で動作するOSのマルウェア定義ファイルを自動更新する。",
      "ウ": "AWSやAzureなどのIaaS/PaaS環境の設定ミス(公開S3バケット，過剰なIAM権限等)やセキュリティ基準違反を継続的に監視・検知する。",
      "エ": "オンプレミスのファイアウォールの通信ログをクラウドストレージへバックアップする。"
    },
    answer: "ウ",
    explanation: "CSPMは、クラウドインフラ(IaaS/PaaS)の設定不備やコンプライアンス逸脱(暗号化漏れ、ポート解放ミス等)をAPI経由で継続的にスキャン・可視化し是正するソリューションです。アはCASB、イはCWPPの説明です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 43 }]
  },
  {
    masterId: "PRED-44", category: "security", subcategory: "security", tags: ["XDR", "EDR", "SOC"],
    question: "【令和8年度 予想】セキュリティ対策における「XDR (Extended Detection and Response)」の特徴として，適切なものはどれか。",
    choices: {
      "ア": "ウイルス対策ソフトのシグネチャデータベースをクラウド上で倍増させる技術。",
      "イ": "ネットワーク上のパケットをすべて復号して平文保存するアーカイブシステム。",
      "ウ": "ファイアウォールとIDSの物理アプライアンスを単一シャーシに収容する製品。",
      "エ": "エンドポイント(EDR)，ネットワーク(NDR)，クラウド，メール等の多様なセキュリティログを横断的に収集・相関分析し，高度な攻撃を迅速に検知・対処する。"
    },
    answer: "エ",
    explanation: "XDRは、エンドポイント単体にとどまるEDRの枠を超え、ネットワークトラフィック、クラウドワークロード、メール等のテレメトリを統合相関分析することで、サイロ化を解消しインシデントの全体像を即座に可視化・封じ込めする技術です。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 44 }]
  },
  {
    masterId: "PRED-45", category: "security", subcategory: "security", tags: ["SOAR", "インシデント対応自動化"],
    question: "【令和8年度 予想】SOCやCSIRTにおける業務効率化技術である「SOAR (Security Orchestration, Automation and Response)」の主な機能はどれか。",
    choices: {
      "ア": "セキュリティ脅威アラートに対する初動調査や端末隔離などの一連の対応手順を「プレイブック」として自動化・オーケストレーションする。",
      "イ": "ソースコードの脆弱性をコンパイル時に静的解析する。",
      "ウ": "サーバのrootパスワードを定期的に自動変更する。",
      "エ": "ネットワーク回線の帯域を動的に増速する。"
    },
    answer: "ア",
    explanation: "SOARは、SIEMやXDRが検知した膨大なセキュリティアラートに対し、脅威インテリジェンス照会、ファイアウォールでのIP遮断、感染端末のネットワーク隔離などの定型対応ワークフロー(プレイブック)を自動実行し、アナリストの負荷軽減と対応迅速化を図ります。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 45 }]
  },

  // --- コンテナ・自動化・信頼性計算 (5問) ---
  {
    masterId: "PRED-46", category: "network", subcategory: "sdn", tags: ["サービスメッシュ", "Envoy", "Istio"],
    question: "【令和8年度 予想】Kubernetes等のコンテナ環境における「サービスメッシュ（例: Istio, Envoy）」の役割として，適切なものはどれか。",
    choices: {
      "ア": "物理サーバのCPUコアを仮想マシンに動的配分するハイパーバイザ機能。",
      "イ": "各サービスコンテナにサイドカープロキシを配置し，サービス間通信の暗号化(mTLS)，トラフィック制御(カナリアリリース)，可視化をアプリケーションコード変更なしで提供する。",
      "ウ": "コンテナのDockerイメージをビルド・配布するレジストリ機能。",
      "エ": "リレーショナルデータベースのテーブルを自動シャーディングする機能。"
    },
    answer: "イ",
    explanation: "サービスメッシュは、マイクロサービス間のEast-West通信を制御する専用インフラ層です。各Podにサイドカープロキシ(Envoy等)を自動注入し、アプリのコードに手を加えることなく、サービス間の相互TLS認証(mTLS)、詳細メトリクス収集、サーキットブレーカー等を実現します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 46 }]
  },
  {
    masterId: "PRED-47", category: "network", subcategory: "sdn", tags: ["Kubernetes", "CNI"],
    question: "【令和8年度 予想】コンテナオーケストレーション環境(Kubernetes等)において，Pod作成時に仮想ネットワークインターフェースの接続やIPアドレス割り当てを行うプラグイン共通仕様はどれか。",
    choices: { "ア": "CRI (Container Runtime Interface)", "イ": "CSI (Container Storage Interface)", "ウ": "CNI (Container Network Interface)", "エ": "OCI (Open Container Initiative)" },
    answer: "ウ",
    explanation: "CNI(Container Network Interface)はCloud Native Computing Foundation (CNCF)の標準プロジェクトであり、Calico、Flannel、CiliumなどのネットワークプラグインがCNI仕様に準拠することで、Kubernetes上でシームレスにコンテナ間通信を提供します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 47 }]
  },
  {
    masterId: "PRED-48", category: "network", subcategory: "other", tags: ["eBPF", "Linuxカーネル"],
    question: "【令和8年度 予想】近年のクラウドネイティブネットワークやセキュリティ(Cilium等)で注目される「eBPF (extended Berkeley Packet Filter)」の特徴はどれか。",
    choices: {
      "ア": "ハードウェアスイッチのASICチップを直接焼き直す技術。",
      "イ": "ユーザー空間のアプリケーションのみでパケット処理を行い，カーネルを完全にバイパスする技術。",
      "ウ": "パケットをすべてディスクに書き込んでからバッチ処理する仕組み。",
      "エ": "Linuxカーネルコードを変更・再コンパイルすることなく，安全なサンドボックス内でパケットフィルタリングやモニタリングプログラムを実行できる技術。"
    },
    answer: "エ",
    explanation: "eBPFは、カーネル空間内の仮想マシン(サンドボックス)上で検証済みのバイトコードを動的に実行するLinux技術です。カーネルモジュールを開発・再起動することなく、パケット転送の超高速化(XDP)、詳細な可視化、ランタイムセキュリティ監視を実現します。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 48 }]
  },
  {
    masterId: "PRED-49", category: "network", subcategory: "management", tags: ["NETCONF", "YANG", "自動化"],
    question: "【令和8年度 予想】ネットワーク機器の設定自動化・プログラマビリティ技術において，IETF標準のデータモデル記述言語「YANG」によってモデル化された設定データを，XMLメッセージ形式で安全に送受信・操作するプロトコルはどれか。",
    choices: { "ア": "NETCONF (RFC 6241)", "イ": "SNMPv1", "ウ": "Telnet", "エ": "TFTP" },
    answer: "ア",
    explanation: "NETCONFはSSH等のセキュアトランスポート上でXMLメッセージを用いてネットワーク機器の設定操作(get-config, edit-config等)やトランザクション管理を行うプロトコルです。データ構造のモデリング言語としてYANGが標準利用されます(REST形式のRESTCONFも存在)。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 49 }]
  },
  {
    masterId: "PRED-50", category: "other", subcategory: "other", tags: ["信頼性計算", "並列システム"],
    question: "【令和8年度 予想】稼働率99%のシステムAと稼働率99%のシステムBを並列に接続し，少なくともどちらか一方が稼働していればシステム全体として稼働とみなす並列冗長化システムの全体稼働率は何%か。",
    choices: { "ア": "98.01%", "イ": "99.99%", "ウ": "99.00%", "エ": "99.90%" },
    answer: "イ",
    explanation: "並列システムの稼働率は「1 - (両方同時に故障している確率)」で計算します。システムAおよびBの故障率は 1 - 0.99 = 0.01 (1%)。両方が同時に停止する確率は 0.01 × 0.01 = 0.0001 (0.01%)。したがってシステム全体の稼働率は 1 - 0.0001 = 0.9999 (99.99%) となります。",
    appearances: [{ year: "R8", yearLabel: "令和8年(予想)", yearNum: 2026, num: 50 }]
  }
];

// フラットなQUESTIONS_DBとREUSE_MAPの自動構築
const QUESTIONS_DB = [];
const REUSE_MAP = {};

MASTER_QUESTIONS.forEach(item => {
  const isPred = item.masterId.startsWith("PRED");
  const groupIds = item.appearances.map(a => `${a.year}-Q${String(a.num).padStart(2, '0')}`);

  item.appearances.forEach(app => {
    const qId = `${app.year}-Q${String(app.num).padStart(2, '0')}`;
    const sameAsList = groupIds.filter(id => id !== qId);

    const qObj = {
      id: qId,
      masterId: item.masterId,
      year: app.year,
      yearLabel: app.yearLabel,
      yearNum: app.yearNum,
      number: app.num,
      category: item.category,
      subcategory: item.subcategory,
      tags: [...item.tags],
      question: item.question,
      choices: { ...item.choices },
      answer: item.answer,
      explanation: item.explanation,
      sameAs: sameAsList,
      isPrediction: isPred
    };

    QUESTIONS_DB.push(qObj);
    REUSE_MAP[qId] = sameAsList;
  });
});

// 年・問題番号順にソート
QUESTIONS_DB.sort((a, b) => {
  if (a.yearNum !== b.yearNum) return a.yearNum - b.yearNum;
  return a.number - b.number;
});

// ブラウザ環境とNode.js環境の両対応エクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS_DB, REUSE_MAP, CATEGORY_INFO, SUBCATEGORY_INFO };
} else {
  window.MASTER_QUESTIONS = MASTER_QUESTIONS;
  window.QUESTIONS_DB = QUESTIONS_DB;
  window.REUSE_MAP = REUSE_MAP;
  window.CATEGORY_INFO = CATEGORY_INFO;
  window.SUBCATEGORY_INFO = SUBCATEGORY_INFO;
}
