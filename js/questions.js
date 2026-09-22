// ネットワークスペシャリスト 午前II (科目A-2) 問題データベース
// 平成21年(H21/2009)〜令和7年(R7/2025) 全17年度 × 各25問 (計425問) ＆ 令和8年度予想問題50問 (計475問)

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

const YEAR_MAP = {
  H21: { label: "平成21年", num: 2009 },
  H22: { label: "平成22年", num: 2010 },
  H23: { label: "平成23年", num: 2011 },
  H24: { label: "平成24年", num: 2012 },
  H25: { label: "平成25年", num: 2013 },
  H26: { label: "平成26年", num: 2014 },
  H27: { label: "平成27年", num: 2015 },
  H28: { label: "平成28年", num: 2016 },
  H29: { label: "平成29年", num: 2017 },
  H30: { label: "平成30年", num: 2018 },
  R1:  { label: "令和元年", num: 2019 },
  R2:  { label: "令和2年",  num: 2020 },
  R3:  { label: "令和3年",  num: 2021 },
  R4:  { label: "令和4年",  num: 2022 },
  R5:  { label: "令和5年",  num: 2023 },
  R6:  { label: "令和6年",  num: 2024 },
  R7:  { label: "令和7年",  num: 2025 },
  R8:  { label: "令和8年(予想)", num: 2026 }
};

const MASTER_QUESTIONS = [
  // =========================================================================
  // 問1: 呼量・トラフィック理論・回線伝送時間 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-CALC-01", slot: 1, years: ["H29", "R4", "R7"],
    category: "other", subcategory: "other", tags: ["トラフィック理論", "アーラン計算"],
    question: "180台の電話機のトラフィックを調べたところ，電話機1台当たりの呼の発生頻度は3分に1回，平均回線保留時間は80秒であった。このときの呼量は何アーランか。",
    choices: { "ア": "20", "イ": "40", "ウ": "60", "エ": "80" }, answer: "エ",
    explanation: "電話機1台当たりの1時間の呼数は 60分 ÷ 3分 = 20回。全180台の1時間の総呼数は 180 × 20 = 3,600回。呼量(アーラン) = (総呼数 × 平均保留時間) ÷ 単位時間 = (3,600回 × 80秒) ÷ 3,600秒 = 80アーランとなります。"
  },
  {
    masterId: "M-CALC-02", slot: 1, years: ["H26", "H30", "R6"],
    category: "other", subcategory: "other", tags: ["アーランB式", "回線計算"],
    question: "1時間当たりの平均通話回数が60回で，平均保留時間は120秒である。呼損率を0.1以下にしたいとき，必要な回線数は最低幾らか。（呼損率0.1時の許容呼量：回線数3=1.271, 回線数4=2.045, 回線数5=2.881）",
    choices: { "ア": "3", "イ": "4", "ウ": "5", "エ": "6" }, answer: "イ",
    explanation: "呼量は (60回 × 120秒) ÷ 3,600秒 = 2.0アーラン。許容呼量表を参照すると、回線数3では1.271アーランまで運べず不足ですが、回線数4では2.045アーランまで運べるため、必要な回線数は最低4回線です。"
  },
  {
    masterId: "M-CALC-03", slot: 1, years: ["H21", "H25", "R2"],
    category: "other", subcategory: "other", tags: ["伝送時間", "回線計算"],
    question: "帯域幅1,000kビット/秒の通信回線を用いて，100万ビットのデータを転送する。通信回線の伝送効率が50%であるとき，データ転送に要する時間は何秒か。",
    choices: { "ア": "0.5", "イ": "1", "ウ": "2", "エ": "4" }, answer: "ウ",
    explanation: "実効伝送速度は 1,000kビット/秒 × 0.5 = 500kビット/秒。転送時間は 1,000,000ビット ÷ 500,000ビット/秒 = 2秒となります。"
  },
  {
    masterId: "M-CALC-04", slot: 1, years: ["H22", "H27", "R3"],
    category: "other", subcategory: "other", tags: ["回線利用率", "伝送計算"],
    question: "通信速度1.5Mビット/秒のWAN回線において，平均パケット長1,000バイトのパケットが毎秒100個発生している。この回線の利用率は約何%か。",
    choices: { "ア": "26.7%", "イ": "40.0%", "ウ": "53.3%", "エ": "66.7%" }, answer: "ウ",
    explanation: "毎秒のデータ量は 1,000バイト × 8ビット × 100個 = 800,000ビット/秒 = 0.8Mビット/秒。回線利用率は 0.8M ÷ 1.5M ≒ 0.533 (約53.3%) となります。"
  },
  {
    masterId: "M-CALC-05", slot: 1, years: ["H23", "H28", "R1", "R5"],
    category: "other", subcategory: "other", tags: ["待ち行列", "M/M/1"],
    question: "M/M/1待ち行列モデルにおいて，回線利用率をρとするとき，サービス中を含む平均系内客数を表す式はどれか。",
    choices: { "ア": "ρ / (1 - ρ)", "イ": "ρ^2 / (1 - ρ)", "ウ": "1 / (1 - ρ)", "エ": "ρ / (1 + ρ)" }, answer: "ア",
    explanation: "M/M/1待ち行列モデルにおいて、サービス中を含む系全体の平均客数 L は L = ρ / (1 - ρ) です。待ち行列中のみの客数 Lq は Lq = ρ^2 / (1 - ρ) となります。"
  },
  {
    masterId: "M-CALC-06", slot: 1, years: ["H24"],
    category: "other", subcategory: "other", tags: ["シェーピング", "トークンバケット"],
    question: "トラフィックシェーピングにおいて，トークンバケットアルゴリズムの特徴として適切なものはどれか。",
    choices: { "ア": "規定のバーストサイズまでは超過送信を許容する", "イ": "パケットを常に一定の時間間隔に均等化して送信する", "ウ": "閾値を超えたパケットは直ちに廃棄する", "エ": "パケットの優先度に応じてキューを切り替える" }, answer: "ア",
    explanation: "トークンバケット方式は、蓄積されたトークン量（バケット容量）までは一時的なバースト送信を許容する柔軟なトラフィック制御方式です。"
  },

  // =========================================================================
  // 問2: 音声符号化・VoIP・品質指標 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-VOIP-01", slot: 2, years: ["H24", "R6"],
    category: "network", subcategory: "other", tags: ["VoIP", "G.729"],
    question: "CS-ACELP (G.729) による8kビット/秒の音声符号化を行うVoIP装置において，パケット生成周期が20ミリ秒のとき，1パケットに含まれる音声ペイロードは何バイトか。",
    choices: { "ア": "20", "イ": "40", "ウ": "80", "エ": "160" }, answer: "ア",
    explanation: "8kビット/秒で20ミリ秒(0.02秒)間に生成される音声データ量は、8,000 × 0.02 = 160ビット。バイト換算すると 160 ÷ 8 = 20バイトとなります。"
  },
  {
    masterId: "M-VOIP-02", slot: 2, years: ["H21", "H26", "R1", "R5"],
    category: "network", subcategory: "other", tags: ["VoIP", "G.711"],
    question: "PCM音声符号化方式であるITU-T G.711（64kビット/秒）において，パケット化周期を20ミリ秒とした場合，1パケット当たりの音声ペイロードは何バイトか。",
    choices: { "ア": "80", "イ": "160", "ウ": "320", "エ": "640" }, answer: "イ",
    explanation: "64kビット/秒で20ミリ秒間に生成されるデータ量は 64,000 × 0.02 = 1,280ビット。バイト換算すると 1,280 ÷ 8 = 160バイトです。"
  },
  {
    masterId: "M-VOIP-03", slot: 2, years: ["H22", "H27", "R3", "R7"],
    category: "network", subcategory: "other", tags: ["VoIP", "MOS値"],
    question: "IP電話などの音声通話品質評価において，通話者が主観的に5段階（5:非常に良い〜1:非常に悪い）で採点した平均値を表す指標はどれか。",
    choices: { "ア": "BER", "イ": "MOS", "ウ": "PSNR", "エ": "R値" }, answer: "イ",
    explanation: "主観的通話品質評価の平均評点値をMOS (Mean Opinion Score: 平均意見点) と呼びます。客観的指標であるR値（伝送品質評価値）から推定換算することも行われます。"
  },
  {
    masterId: "M-VOIP-04", slot: 2, years: ["H23", "H28", "R2"],
    category: "network", subcategory: "other", tags: ["SIP", "呼制御"],
    question: "VoIPで呼制御に用いられるSIP (Session Initiation Protocol) において，セッション確立要求を送信するメソッドはどれか。",
    choices: { "ア": "ACK", "イ": "BYE", "ウ": "INVITE", "エ": "REGISTER" }, answer: "ウ",
    explanation: "SIPにおいて通話の開始（セッション確立）を要求するメッセージは「INVITE」です。応答として200 OKが返り、クライアントがACKを返送することでセッションが確立します。"
  },
  {
    masterId: "M-VOIP-05", slot: 2, years: ["H25", "H29", "H30", "R4"],
    category: "network", subcategory: "other", tags: ["RTP", "RTCP"],
    question: "VoIPネットワークにおいて，音声パケットの伝送品質（ジッタ，パケット損失率，往復遅延時間など）を監視・通知するために定期的に送受信されるプロトコルはどれか。",
    choices: { "ア": "RTSP", "イ": "RTCP", "ウ": "RSVP", "エ": "SDP" }, answer: "イ",
    explanation: "RTP (Real-time Transport Protocol) とペアで動作し、受信品質レポート (RR/SR) を送受信してQoS監視を行うプロトコルはRTCP (RTP Control Protocol) です。"
  },

  // =========================================================================
  // 問3: 誤り制御・通信路理論 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-ERR-01", slot: 3, years: ["H21", "H26", "R2", "R6"],
    category: "other", subcategory: "other", tags: ["誤り制御", "ハミング符号"],
    question: "情報ビットが4ビットのデータに対して，1ビットの誤り訂正が可能なハミング符号を構成するとき，必要な検査ビット（パリティビット）の最小数は幾つか。",
    choices: { "ア": "2", "イ": "3", "ウ": "4", "エ": "5" }, answer: "イ",
    explanation: "情報ビット m=4 のとき、ハミングの不等式 2^p >= m + p + 1 を満たす最小の p を求めます。p=3 のとき 2^3 = 8 >= 4 + 3 + 1 = 8 となり成立するため、3ビットが正解です。"
  },
  {
    masterId: "M-ERR-02", slot: 3, years: ["H22", "H27", "R3", "R7"],
    category: "other", subcategory: "other", tags: ["誤り制御", "CRC"],
    question: "イーサネットのFCS (Frame Check Sequence) などで広く用いられている，生成多項式に基づく誤り検出方式はどれか。",
    choices: { "ア": "チェックサム", "イ": "水平垂直パリティ", "ウ": "CRC (巡回冗長検査)", "エ": "ハミング符号" }, answer: "ウ",
    explanation: "イーサネットでは、32ビットの生成多項式を用いたCRC-32 (Cyclic Redundancy Check) がFCSとしてフレーム末尾に付加され、伝送誤りを検出します。"
  },
  {
    masterId: "M-ERR-03", slot: 3, years: ["H23", "H28", "H30", "R4"],
    category: "other", subcategory: "other", tags: ["情報理論", "シャノンの定理"],
    question: "帯域幅 W (Hz)，信号対雑音比 S/N の連続通信路における理論上の最大伝送容量 C (ビット/秒) を表すシャノンの公式はどれか。",
    choices: { "ア": "C = W log2(1 + S/N)", "イ": "C = 2W log2(S/N)", "ウ": "C = W (1 + S/N)", "エ": "C = W / log2(1 + S/N)" }, answer: "ア",
    explanation: "シャノンの定理（通信路容量定理）によると、帯域幅 W と雑音電力比 S/N に対する最大伝送速度は C = W log2(1 + S/N) で決定されます。"
  },
  {
    masterId: "M-ERR-04", slot: 3, years: ["H24", "H29", "R1", "R5"],
    category: "other", subcategory: "other", tags: ["誤り率", "伝送計算"],
    question: "ビット誤り率が 1.0 × 10^-6 の通信回線を用いて，1,000バイトのフレームを伝送するとき，フレーム内に誤りが含まれない確率に最も近いものはどれか。（(1 - 10^-6)^8000 ≒ 1 - 8000 × 10^-6）",
    choices: { "ア": "0.992", "イ": "0.998", "ウ": "0.999", "エ": "0.9999" }, answer: "ア",
    explanation: "1,000バイト = 8,000ビット。全ビットが誤りなく伝送される確率は (1 - 10^-6)^8000 ≒ 1 - 0.008 = 0.992 (99.2%) となります。"
  },
  {
    masterId: "M-ERR-05", slot: 3, years: ["H25"],
    category: "other", subcategory: "other", tags: ["誤り訂正", "FEC"],
    question: "受信側で誤りを検出した際に再送を要求するのではなく，冗長ビットを用いて受信側自身で誤りを訂正する通信方式はどれか。",
    choices: { "ア": "ARQ", "イ": "FEC (前方誤り訂正)", "ウ": "フロー制御", "エ": "輻輳制御" }, answer: "イ",
    explanation: "受信側で誤りを自動訂正する方式をFEC (Forward Error Correction: 前方誤り訂正) と呼びます。再送による遅延を許容できない衛星通信やリアルタイム通信で不可欠です。"
  },

  // =========================================================================
  // 問4: MTU・MSS・伝送遅延 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-MTU-01", slot: 4, years: ["H21", "H25", "H29", "R4"],
    category: "network", subcategory: "tcp_udp", tags: ["MTU", "フラグメンテーション"],
    question: "MTUが1,500バイトのイーサネット網において，IPv4（ヘッダ長20バイト）でトータル長4,000バイトのパケットを送信する場合，第1フラグメントに含まれるデータ（ペイロード）の最大長は何バイトか。",
    choices: { "ア": "1,472", "イ": "1,480", "ウ": "1,496", "エ": "1,500" }, answer: "イ",
    explanation: "MTU 1,500バイトからIPヘッダ20バイトを引くと 1,480バイト。IPv4のフラグメントオフセットは8バイト単位で指定する必要があるため、1,480は 8 × 185 で割り切れ、最大長は1,480バイトとなります。"
  },
  {
    masterId: "M-MTU-02", slot: 4, years: ["H22", "H27", "R1", "R6"],
    category: "network", subcategory: "tcp_udp", tags: ["MSS", "TCP"],
    question: "標準的なイーサネット（MTU 1,500バイト）環境でオプションヘッダのないIPv4（ヘッダ20バイト）およびTCP（ヘッダ20バイト）を使用する場合，標準的なTCP MSS (Maximum Segment Size) は何バイトか。",
    choices: { "ア": "1,440", "イ": "1,460", "ウ": "1,480", "エ": "1,500" }, answer: "イ",
    explanation: "MSS = MTU - (IPヘッダ長 + TCPヘッダ長) = 1,500 - (20 + 20) = 1,460バイトとなります。"
  },
  {
    masterId: "M-MTU-03", slot: 4, years: ["H23", "H28", "R2", "R7"],
    category: "network", subcategory: "ip", tags: ["PMTUD", "ICMP"],
    question: "送信元ホストが通信経路上の最小MTUを自動検出するPath MTU Discovery (PMTUD) において，中継ルータがパケット分割不可（DF=1）で破棄した際に送信元に返送するICMPメッセージはどれか。",
    choices: { "ア": "Redirect", "イ": "Destination Unreachable (Fragmentation Needed)", "ウ": "Time Exceeded", "エ": "Source Quench" }, answer: "イ",
    explanation: "DF (Don't Fragment) フラグが1のパケットをMTUの小さい回線に転送できない場合、ルータはパケットを廃棄し、ICMP Destination Unreachable (Type 3, Code 4: Fragmentation Needed) を送信元に返します。"
  },
  {
    masterId: "M-MTU-04", slot: 4, years: ["H24", "H30", "R3", "R5"],
    category: "network", subcategory: "other", tags: ["伝送遅延", "物理層"],
    question: "光ファイバ中の光信号の伝搬速度を200,000 km/sとするとき，距離1,000 kmの拠点間における往復の伝搬遅延時間 (RTT) は何ミリ秒か。",
    choices: { "ア": "5", "イ": "10", "ウ": "20", "エ": "50" }, answer: "イ",
    explanation: "片道の距離1,000 kmを進む時間は 1,000 ÷ 200,000 = 0.005秒 (5ミリ秒)。往復 (RTT) では 5 × 2 = 10ミリ秒となります。"
  },
  {
    masterId: "M-MTU-05", slot: 4, years: ["H26"],
    category: "network", subcategory: "switching", tags: ["ジャンボフレーム", "LAN"],
    question: "イーサネットにおいて標準の1,500バイトを超える大きなフレーム（通常約9,000バイト）を転送するジャンボフレームの利点として，最も適切なものはどれか。",
    choices: { "ア": "ヘッダオーバーヘッドとCPU割り込み回数が削減されスループットが向上する", "イ": "異なるMTUのネットワーク間でのフラグメンテーションが不要になる", "ウ": "CSMA/CDによる衝突検出確率が大幅に低減する", "エ": "通信路上での暗号化処理が不要になる" }, answer: "ア",
    explanation: "ジャンボフレームを利用すると、転送するパケット総数が減少し、ヘッダオーバーヘッドの削減およびNICやOSのパケット処理・CPU割り込み負荷が軽減され実効スループットが向上します。"
  },

  // =========================================================================
  // 問5: システム信頼性・稼働率 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-REL-01", slot: 5, years: ["H21", "H26", "H30", "R4", "R7"],
    category: "other", subcategory: "other", tags: ["信頼性", "稼働率"],
    question: "稼働率がともに0.9の2台のルータを並列に接続して冗長化を図ったシステム全体の稼働率は幾らか。",
    choices: { "ア": "0.81", "イ": "0.90", "ウ": "0.95", "エ": "0.99" }, answer: "エ",
    explanation: "並列システムの稼働率は 1 - (1 - A)^2 = 1 - (1 - 0.9) × (1 - 0.9) = 1 - 0.01 = 0.99 (99%) となります。"
  },
  {
    masterId: "M-REL-02", slot: 5, years: ["H22", "H27", "R2", "R6"],
    category: "other", subcategory: "other", tags: ["信頼性", "直列並列"],
    question: "稼働率0.9のルータ2台による並列冗長構成と，稼働率0.99のスイッチ1台を直列に接続したシステム全体の稼働率は幾らか。",
    choices: { "ア": "0.891", "イ": "0.9801", "ウ": "0.989", "エ": "0.99" }, answer: "イ",
    explanation: "ルータ並列部の稼働率は 1 - (1 - 0.9)^2 = 0.99。これとスイッチ（稼働率0.99）の直列接続となるため、システム全体の稼働率は 0.99 × 0.99 = 0.9801 となります。"
  },
  {
    masterId: "M-REL-03", slot: 5, years: ["H23", "H28", "R1", "R5"],
    category: "other", subcategory: "other", tags: ["MTBF", "MTTR"],
    question: "あるネットワーク機器のMTBF（平均故障間隔）が450時間，MTTR（平均修復時間）が50時間であるとき，この機器の稼働率は幾らか。",
    choices: { "ア": "0.10", "イ": "0.80", "ウ": "0.90", "エ": "0.95" }, answer: "ウ",
    explanation: "稼働率 A は A = MTBF / (MTBF + MTTR) = 450 / (450 + 50) = 450 / 500 = 0.90 (90%) です。"
  },
  {
    masterId: "M-REL-04", slot: 5, years: ["H24", "H29", "R3"],
    category: "network", subcategory: "routing", tags: ["マルチホーム", "BGP"],
    question: "企業のインターネット接続において，異なる2社のISPとBGPを用いて接続するマルチホーム構成の目的として，最も適切なものはどれか。",
    choices: { "ア": "一方のISPで障害が発生しても別経路で通信を継続し耐障害性を高める", "イ": "プライベートIPアドレスをそのままインターネットにルーティングする", "ウ": "ISP間のトラフィックを社内LAN経由でトランジット中継する", "エ": "暗号化なしでVPNと同等のセキュリティを確保する" }, answer: "ア",
    explanation: "2社以上の異なるプロバイダとAS間接続を行うマルチホーム構成により、回線やISPの障害時にも自動的に迂回し通信継続性を確保できます。"
  },
  {
    masterId: "M-REL-05", slot: 5, years: ["H25"],
    category: "other", subcategory: "other", tags: ["冗長化", "RTO"],
    question: "システムの耐障害性設計において，障害発生時に予備機に即座に処理を引き継ぎ，停止時間をほぼゼロに抑える待機方式はどれか。",
    choices: { "ア": "コールドスタンバイ", "イ": "ホットスタンバイ", "ウ": "ウォームスタンバイ", "エ": "マルチタスク" }, answer: "イ",
    explanation: "予備系を常に通電・同期させておき、障害時に即座にフェイルオーバーする方式をホットスタンバイと呼びます。"
  },

  // =========================================================================
  // 問6: イーサネット物理層・光ファイバ (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-ETH-01", slot: 6, years: ["H21", "H25", "H29", "R3", "R7"],
    category: "network", subcategory: "switching", tags: ["10GBASE-SR", "光ファイバ"],
    question: "10ギガビットイーサネットの光ファイバ規格のうち，マルチモード光ファイバ (MMF) を使用し，短波長850nm帯のレーザで最大約300m伝送できるものはどれか。",
    choices: { "ア": "10GBASE-SR", "イ": "10GBASE-LR", "ウ": "10GBASE-ER", "エ": "10GBASE-T" }, answer: "ア",
    explanation: "10GBASE-SR (Short Range) は850nmの短波長レーザとマルチモード光ファイバ(MMF)を用い、ビル内やデータセンター内短距離(〜300m)で利用されます。"
  },
  {
    masterId: "M-ETH-02", slot: 6, years: ["H22", "H26", "H30", "R4"],
    category: "network", subcategory: "switching", tags: ["10GBASE-LR", "光ファイバ"],
    question: "10ギガビットイーサネットの規格のうち，シングルモード光ファイバ (SMF) を使用し，1310nm波長帯で最大10kmの伝送が可能なものはどれか。",
    choices: { "ア": "10GBASE-SR", "イ": "10GBASE-LR", "ウ": "10GBASE-ER", "エ": "10GBASE-LX4" }, answer: "イ",
    explanation: "10GBASE-LR (Long Range) は1310nmのレーザとシングルモード光ファイバ(SMF)を用い、最大10kmの拠点間伝送に対応します。"
  },
  {
    masterId: "M-ETH-03", slot: 6, years: ["H23", "H27", "R1", "R5"],
    category: "network", subcategory: "switching", tags: ["オートネゴシエーション", "イーサネット"],
    question: "イーサネットのオートネゴシエーション機能において，対向機器同士が通信速度や全二重/半二重を合意するために送信するパルス信号はどれか。",
    choices: { "ア": "FLP (Fast Link Pulse)", "イ": "NLP (Normal Link Pulse)", "ウ": "BPDU", "エ": "Heartbeat" }, answer: "ア",
    explanation: "100BASE-TXや1000BASE-Tのオートネゴシエーションでは、FLP (Fast Link Pulse) バースト信号を用いて互いの対応機能を通知し合います。"
  },
  {
    masterId: "M-ETH-04", slot: 6, years: ["H24", "H28", "R2", "R6"],
    category: "network", subcategory: "switching", tags: ["PoE", "LAN"],
    question: "LANケーブル（ツイストペアケーブル）を通じて，ネットワークカメラや無線アクセスポイントに電力を供給する技術規格はどれか。",
    choices: { "ア": "PLC", "イ": "PoE (IEEE 802.3af/at)", "ウ": "WoL", "エ": "UPnP" }, answer: "イ",
    explanation: "PoE (Power over Ethernet) は、Cat5e以上のツイストペアケーブルの余剰芯線または信号重畳線を用いて電力を供給する規格です。"
  },

  // =========================================================================
  // 問7: VLAN・IEEE 802.1Q (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-VLAN-01", slot: 7, years: ["H21", "H25", "H29", "R3", "R7"],
    category: "network", subcategory: "switching", tags: ["VLAN", "IEEE 802.1Q"],
    question: "IEEE 802.1Qで規定されるVLANタグフレームにおいて，VLANタグが挿入される位置として正しいものはどれか。",
    choices: { "ア": "送信元MACアドレスとタイプ（長さ）フィールドの間", "イ": "宛先MACアドレスの直前", "ウ": "タイプフィールドとIPヘッダの間", "エ": "フレーム末尾のFCSの直後" }, answer: "ア",
    explanation: "IEEE 802.1Qタグ（4バイト：TPID 0x8100 + TCI）は、通常のイーサネットフレームの「送信元MACアドレス」と「タイプ（Type/Length）」の間に挿入されます。"
  },
  {
    masterId: "M-VLAN-02", slot: 7, years: ["H22", "H26", "H30", "R4"],
    category: "network", subcategory: "switching", tags: ["トランクポート", "VLAN"],
    question: "1台のL2スイッチにおいて，複数のVLANに所属するフレームを1本の物理リンク上に多重化して送受信するポートの設定モードはどれか。",
    choices: { "ア": "アクセスポート", "イ": "トランクポート（タグポート）", "ウ": "ミラーポート", "エ": "プロミスキャスポート" }, answer: "イ",
    explanation: "複数VLANのトラフィックにVLANタグを付加して1本の物理リンクで中継するポートを「トランクポート（タグポート）」と呼びます。"
  },
  {
    masterId: "M-VLAN-03", slot: 7, years: ["H23", "H27", "R1", "R5"],
    category: "network", subcategory: "switching", tags: ["ダイナミックVLAN", "VLAN"],
    question: "接続された端末のMACアドレスやIEEE 802.1X認証ユーザ情報に基づいて，スイッチの接続ポートのVLANを動的に切り替える仕組みはどれか。",
    choices: { "ア": "スタティックVLAN", "イ": "ダイナミックVLAN", "ウ": "プライベートVLAN", "エ": "ボイスVLAN" }, answer: "イ",
    explanation: "接続端末の認証結果やMACアドレス、サブネット等に応じて所属VLANを自動決定・変更する技術をダイナミックVLANと呼びます。"
  },
  {
    masterId: "M-VLAN-04", slot: 7, years: ["H24", "H28", "R2", "R6"],
    category: "network", subcategory: "switching", tags: ["プライベートVLAN", "VLAN"],
    question: "プライベートVLAN (PVLAN) において，同一VLAN内の他のどのポートとも直接通信できず，プロミスキャスポートとのみ通信可能なポート種別はどれか。",
    choices: { "ア": "Isolatedポート", "イ": "Communityポート", "ウ": "Promiscuousポート", "エ": "Trunkポート" }, answer: "ア",
    explanation: "Isolatedポートは、同じIsolatedポート同士の通信も遮断され、デフォルトゲートウェイ等と接続されたPromiscuousポートとのみ通信できます。"
  },

  // =========================================================================
  // 問8: スパニングツリー (STP/RSTP) (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-STP-01", slot: 8, years: ["H21", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "switching", tags: ["RSTP", "STP"],
    question: "RSTP (IEEE 802.1w) において，ルートポートの障害時に代替の最短経路として即座にフォワーディング状態に遷移できるポートの役割はどれか。",
    choices: { "ア": "Alternateポート", "イ": "Backupポート", "ウ": "Designatedポート", "エ": "Disabledポート" }, answer: "ア",
    explanation: "Alternateポートは、他のブリッジから届くBPDUを受信して待機しており、現行のルートポートがダウンした際に即座に新たなルートポートに昇格します。"
  },
  {
    masterId: "M-STP-02", slot: 8, years: ["H22", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "switching", tags: ["ルートブリッジ", "STP"],
    question: "スパニングツリープロトコル (IEEE 802.1D) において，ルートブリッジを選定する際に比較される「ブリッジID」の構成要素はどれか。",
    choices: { "ア": "ブリッジプライオリティとMACアドレス", "イ": "ポートプライオリティとIPアドレス", "ウ": "パスコストとホップ数", "エ": "VLAN IDとシリアル番号" }, answer: "ア",
    explanation: "ブリッジIDは2バイトのブリッジプライオリティと6バイトのベースMACアドレスで構成され、全体として最小の値を持つスイッチがルートブリッジに選定されます。"
  },
  {
    masterId: "M-STP-03", slot: 8, years: ["H23", "H27", "R1", "R5"],
    category: "network", subcategory: "switching", tags: ["MSTP", "STP"],
    question: "多数のVLANが存在する環境において，複数のVLANをいくつかのグループ（インスタンス）にまとめ，インスタンス単位でSTPツリーを構築する規格はどれか。",
    choices: { "ア": "PVST+", "イ": "MSTP (IEEE 802.1s)", "ウ": "RSTP (IEEE 802.1w)", "エ": "GARP" }, answer: "イ",
    explanation: "MSTP (Multiple Spanning Tree Protocol: IEEE 802.1s) は、複数VLANをインスタンスに集約して計算負荷とBPDU通信量を低減します。"
  },
  {
    masterId: "M-STP-04", slot: 8, years: ["H24", "H28", "R4"],
    category: "network", subcategory: "switching", tags: ["BPDUガード", "STP"],
    question: "端末が接続されるエッジポートに誤ってスイッチが接続されSTP BPDUが流入した際，即座にポートを無効化（error-disabled）してトポロジを保護する機能はどれか。",
    choices: { "ア": "PortFast", "イ": "BPDUガード", "ウ": "ルートガード", "エ": "ストームコントロール" }, answer: "イ",
    explanation: "BPDUガードは、端末収容ポートで予期せぬBPDUを受信した場合にポートを自動閉塞し、不正なルートブリッジ強奪やループ形成を防止します。"
  },

  // =========================================================================
  // 問9: リンクアグリゲーション (LAG/LACP) (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-LAG-01", slot: 9, years: ["H21", "H25", "H28", "R1", "R5"],
    category: "network", subcategory: "switching", tags: ["LAG", "LACP"],
    question: "IEEE 802.3ad (IEEE 802.1AX) で規定されるLACPにおいて，対向機器とLACPパケットを積極的に交換してリンクを束ねるモードはどれか。",
    choices: { "ア": "Active", "イ": "Passive", "ウ": "Auto", "エ": "Desirable" }, answer: "ア",
    explanation: "LACPの動作モードには、自発的にLACPパケットを送出する「Active」と、相手からのパケット受信を待って応答する「Passive」があります。"
  },
  {
    masterId: "M-LAG-02", slot: 9, years: ["H22", "H26", "H29", "R2", "R6"],
    category: "network", subcategory: "switching", tags: ["LAG", "負荷分散"],
    question: "リンクアグリゲーションにおける物理リンク間のフレーム負荷分散方式として，一般に最も適切なものはどれか。",
    choices: { "ア": "MACアドレスやIPアドレス，ポート番号のハッシュ値に基づくフロー単位の分散", "イ": "フレーム1個ごとに順番に物理ポートを切り替えるラウンドロビン", "ウ": "回線の混雑度を動的に計測して空いているポートに都度割り振る", "エ": "ブロードキャストフレームのみを別リンクに固定する" }, answer: "ア",
    explanation: "パケット順序逆転を防ぐため、送信元・宛先のMAC/IP/ポート番号などから算出されるハッシュ値に基づき、同一フローの通信は同一物理リンクに固定して負荷分散します。"
  },
  {
    masterId: "M-LAG-03", slot: 9, years: ["H23", "H27", "H30", "R3", "R7"],
    category: "network", subcategory: "switching", tags: ["MLAG", "冗長化"],
    question: "2台の物理スイッチ間で同期を取り，対向機器から見て論理的な1台のスイッチとして振る舞うことで，スイッチを跨ぐリンクアグリゲーションを実現する技術はどれか。",
    choices: { "ア": "VRRP", "イ": "MLAG (マルチシャーシLAG)", "ウ": "STP", "エ": "HSRP" }, answer: "イ",
    explanation: "MLAG (Multi-Chassis Link Aggregation) や各社スタック/vPC技術により、2台のスイッチに跨るリンクアグリゲーションを構成し、STPブロックを排除して全帯域を活用できます。"
  },
  {
    masterId: "M-LAG-04", slot: 9, years: ["H24", "R4"],
    category: "network", subcategory: "other", tags: ["チーミング", "サーバ"],
    question: "サーバの複数NICを論理的に束ねるNICチーミングにおいて，1枚のNICのみで通信し，障害時にもう1枚のNICに即座に切り替える方式はどれか。",
    choices: { "ア": "フォールトトレランス (Active-Standby)", "イ": "ロードバランシング (Active-Active)", "ウ": "LACPリンクアグリゲーション", "エ": "トランクモード" }, answer: "ア",
    explanation: "Active-Standby型のフォールトトレランスモードは、一方のNICを予備とし、主系NICのリンクダウンや通信断を検出して瞬時に予備系へ通信を引き継ぎます。"
  },

  // =========================================================================
  // 問10: 無線LAN規格・物理層 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-WLAN-01", slot: 10, years: ["H21", "H25", "H28", "R2", "R6"],
    category: "network", subcategory: "wireless", tags: ["無線LAN", "チャネル"],
    question: "日本国内の2.4GHz帯無線LAN (IEEE 802.11b/g/n) において，電波干渉を起こさずに同時に使用できる推奨チャネルの組み合わせはどれか。",
    choices: { "ア": "1ch, 6ch, 11ch", "イ": "1ch, 3ch, 5ch", "ウ": "1ch, 7ch, 14ch", "エ": "2ch, 4ch, 6ch" }, answer: "ア",
    explanation: "2.4GHz帯では1チャネルの専有帯域幅が約20〜22MHzあり、5チャネル（25MHz）以上離す必要があるため、干渉しない組み合わせは 1ch, 6ch, 11ch (または 1, 7, 13) の3チャネルです。"
  },
  {
    masterId: "M-WLAN-02", slot: 10, years: ["H24", "H27", "H30", "R3"],
    category: "network", subcategory: "wireless", tags: ["IEEE 802.11ac", "Wi-Fi 5"],
    question: "IEEE 802.11ac (Wi-Fi 5) の技術的特徴として，適切なものはどれか。",
    choices: { "ア": "2.4GHz帯と5GHz帯の両方を同時に束ねて通信する", "イ": "OFDMAにより複数端末へ同時サブキャリア割り当てを行う", "ウ": "5GHz帯専用で動作し，最大8ストリームのMU-MIMOや256QAM変調に対応する", "エ": "6GHz帯のみを用いて最大9.6Gbpsの通信を行う" }, answer: "ウ",
    explanation: "IEEE 802.11acは5GHz帯専用の規格であり、最大160MHzのチャネルボンディング、256QAM、最大8空間ストリーム、ダウンリンクMU-MIMO等を採用してギガビット超を達成しました。"
  },
  {
    masterId: "M-WLAN-03", slot: 10, years: ["H29", "R1", "R4", "R7"],
    category: "network", subcategory: "wireless", tags: ["IEEE 802.11ax", "Wi-Fi 6"],
    question: "IEEE 802.11ax (Wi-Fi 6) で導入された，周波数チャネルを細分化（リソースユニット）して複数端末と同時に送受信を行う通信技術はどれか。",
    choices: { "ア": "DSSS", "イ": "FHSS", "ウ": "CDMA", "エ": "OFDMA" }, answer: "エ",
    explanation: "IEEE 802.11axでは、LTE/5Gと同様のOFDMA (直交周波数分割多元接続) を導入し、1チャネルを複数のリソースユニット(RU)に細分化して複数端末と同時通信を可能にしました。"
  },
  {
    masterId: "M-WLAN-04", slot: 10, years: ["H22", "H23", "H26", "R5"],
    category: "network", subcategory: "wireless", tags: ["CSMA/CA", "RTS/CTS"],
    question: "無線LANのアクセス制御方式CSMA/CAにおいて，障害物等により互いに電波が届かない端末同士が同時に送信してAPで衝突する「隠れ端末問題」を防ぐ制御手順はどれか。",
    choices: { "ア": "トークンパッシング", "イ": "RTS/CTSハンドシェイク", "ウ": "CDMA/CA", "エ": "ビーコンインターバル短縮" }, answer: "イ",
    explanation: "送信側がRTS (Request to Send) を送り、APがCTS (Clear to Send) を同報することで、周囲のすべての端末に送信禁止時間を通知し衝突を防ぎます。"
  },

  // =========================================================================
  // 問11: 無線LANセキュリティ (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-WSEC-01", slot: 11, years: ["H21", "H24", "H27", "H30", "R3"],
    category: "network", subcategory: "wireless", tags: ["WPA2", "AES-CCMP"],
    question: "WPA2において標準採用されている，強固な共通鍵暗号方式AESに基づきデータの機密性と改ざん検知を提供する暗号化プロトコルはどれか。",
    choices: { "ア": "TKIP", "イ": "WEP", "ウ": "CCMP", "エ": "DES" }, answer: "ウ",
    explanation: "WPA2では、AES暗号をベースにCBC-MACによる完全性保証を組み合わせたCCMP (Counter mode with CBC-MAC Protocol) が標準規定されています。"
  },
  {
    masterId: "M-WSEC-02", slot: 11, years: ["H29", "R2", "R4", "R6", "R7"],
    category: "network", subcategory: "wireless", tags: ["WPA3", "SAE"],
    question: "WPA3-Personalで導入された，オフライン辞書攻撃を防ぎ，事前共有鍵が漏洩しても過去の通信が解読されないPFSを提供する認証プロトコルはどれか。",
    choices: { "ア": "PSK (Pre-Shared Key)", "イ": "EAP-TLS", "ウ": "LEAP", "エ": "SAE (Simultaneous Authentication of Equals)" }, answer: "エ",
    explanation: "WPA3-Personalでは、Dragonfly鍵交換アルゴリズムに基づくSAE (Simultaneous Authentication of Equals) を採用し、パッシブな盗聴による辞書攻撃を排除しPFSを確立します。"
  },
  {
    masterId: "M-WSEC-03", slot: 11, years: ["H22", "H25", "H28", "R1", "R5"],
    category: "network", subcategory: "wireless", tags: ["ステルスSSID", "無線セキュリティ"],
    question: "無線LAN親機の「ステルスSSID」機能および「MACアドレスフィルタリング」のセキュリティ的限界として，最も適切なものはどれか。",
    choices: { "ア": "暗号化の計算強度が低下しWPA2の強度が保てなくなる", "イ": "パケットキャプチャやMAC偽装により容易に特定・回避されるため気休めに過ぎない", "ウ": "5GHz帯では規格上これらの機能を使用できない", "エ": "接続可能端末数が16台に制限される" }, answer: "イ",
    explanation: "ビーコンのSSIDを消してもクライアントのプローブ要求からSSIDは判明し、MACアドレスは平文で流れるため容易に偽装可能です。WPA2/WPA3等の堅牢な暗号化と認証が必須です。"
  },
  {
    masterId: "M-WSEC-04", slot: 11, years: ["H23", "H26"],
    category: "network", subcategory: "wireless", tags: ["PMF", "802.11w"],
    question: "無線LANにおいて，切断要求 (Deauthentication) や関連付け解除などの管理フレームを暗号化・認証し，切断攻撃を防ぐ規格はどれか。",
    choices: { "ア": "IEEE 802.11w (PMF)", "イ": "IEEE 802.11i", "ウ": "IEEE 802.1X", "エ": "IEEE 802.11e" }, answer: "ア",
    explanation: "IEEE 802.11w (Protected Management Frames: PMF) は、平文で送信されていた管理フレームを暗号・改ざん保護し、第三者による偽造Deauth攻撃を防御します。"
  },

  // =========================================================================
  // 問12: IPv4 アドレッシング・サブネット (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-IP4-01", slot: 12, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "ip", tags: ["IPv4", "プライベートIP"],
    question: "RFC 1918で規定されている，インターネット上でルーティングされないプライベートIPアドレスの範囲として，正しいものはどれか。",
    choices: { "ア": "10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16", "イ": "10.0.0.0/8, 172.16.0.0/16, 192.168.0.0/24", "ウ": "127.0.0.0/8, 169.254.0.0/16, 224.0.0.0/4", "エ": "192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24" }, answer: "ア",
    explanation: "プライベートIPアドレスは、クラスA: 10.0.0.0〜10.255.255.255 (/8)、クラスB: 172.16.0.0〜172.31.255.255 (/12)、クラスC: 192.168.0.0〜192.168.255.255 (/16) です。"
  },
  {
    masterId: "M-IP4-02", slot: 12, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "ip", tags: ["CIDR", "サブネット計算"],
    question: "IPアドレスプレフィックス 192.168.10.128/26 のサブネットにおいて，ホストに割り当て可能なIPアドレスの範囲として，正しいものはどれか。",
    choices: { "ア": "192.168.10.128 〜 192.168.10.191", "イ": "192.168.10.129 〜 192.168.10.190", "ウ": "192.168.10.129 〜 192.168.10.254", "エ": "192.168.10.65 〜 192.168.10.126" }, answer: "イ",
    explanation: "/26のホスト部は6ビット（全64アドレス）。ネットワークアドレスは .128、ブロードキャストアドレスは .191。したがってホストに割り当て可能な範囲は .129 〜 .190 (計62個) です。"
  },
  {
    masterId: "M-IP4-03", slot: 12, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "ip", tags: ["DHCPリレー", "ブロードキャスト"],
    question: "ルータを越えた別サブネットにあるDHCPサーバからIPアドレスを取得するために，中継ルータ上でブロードキャストパケットをユニキャストに変換して転送する機能はどれか。",
    choices: { "ア": "Proxy ARP", "イ": "DNSフォワーダ", "ウ": "NAT", "エ": "DHCPリレーエージェント" }, answer: "エ",
    explanation: "DHCP Discover等のブロードキャスト要求は通常ルータで破棄されますが、DHCPリレーエージェントを設定することでユニキャストにカプセル化して別セグメントのDHCPサーバへ中継します。"
  },
  {
    masterId: "M-IP4-04", slot: 12, years: ["H27", "R4"],
    category: "network", subcategory: "ip", tags: ["TTL", "IPv4ヘッダ"],
    question: "IPv4パケットヘッダのTTL (Time To Live) フィールドの機能として，適切なものはどれか。",
    choices: { "ア": "パケットの生存時間をミリ秒単位で正確に計測する", "イ": "通信回線の最大帯域幅を中継ルータに通知する", "ウ": "ルータを経由するごとに1ずつ減算され，0になるとパケットが破棄され無限ループを防ぐ", "エ": "暗号化されたデータの有効期限を秒単位で指定する" }, answer: "ウ",
    explanation: "TTLはパケットがルータを1ホップ通過するごとに1減算され、0になるとパケットは破棄され送信元へICMP Time Exceededが返されます。"
  },

  // =========================================================================
  // 問13: IPv6 アドレス体系 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-IP6-01", slot: 13, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "ip", tags: ["IPv6", "リンクローカル"],
    question: "IPv6において，同一リンク（同一サブネット）内でのみ有効であり，プレフィックスが「fe80::/10」から始まるアドレス種別はどれか。",
    choices: { "ア": "グローバルユニキャストアドレス", "イ": "ユニークローカルアドレス", "ウ": "マルチキャストアドレス", "エ": "リンクローカルユニキャストアドレス" }, answer: "エ",
    explanation: "リンクローカルアドレス (fe80::/10) はルータを越えない同一リンク内での通信（NDPやルーティングプロトコルネイバー確立等）に用いられます。"
  },
  {
    masterId: "M-IP6-02", slot: 13, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "ip", tags: ["IPv6", "ULA"],
    question: "IPv6において，IPv4のプライベートIPアドレスに相当し，組織内ネットワーク内でのみルーティングされるプレフィックス「fc00::/7」のアドレスはどれか。",
    choices: { "ア": "ユニークローカルユニキャストアドレス (ULA)", "イ": "エニーキャストアドレス", "ウ": "リンクローカルアドレス", "エ": "IPv4互換アドレス" }, answer: "ア",
    explanation: "ULA (Unique Local Address: fc00::/7 / fd00::/8) はインターネット上でグローバルにルーティングされない組織内用のプライベートアドレスです。"
  },
  {
    masterId: "M-IP6-03", slot: 13, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "ip", tags: ["IPv6", "マルチキャスト"],
    question: "IPv6マルチキャストアドレスにおいて，同一リンク上のすべてのIPv6ノードを表すウェルノウンアドレスはどれか。",
    choices: { "ア": "ff02::1", "イ": "ff02::2", "ウ": "ff02::1:2", "エ": "ff02::fb" }, answer: "ア",
    explanation: "「ff02::1」は全ノード（All Nodes）マルチキャストアドレス、「ff02::2」は全ルータ（All Routers）マルチキャストアドレスです。"
  },
  {
    masterId: "M-IP6-04", slot: 13, years: ["H27", "R4"],
    category: "network", subcategory: "ip", tags: ["IPv6ヘッダ", "NextHeader"],
    question: "IPv6基本ヘッダの構造に関する記述として，正しいものはどれか。",
    choices: { "ア": "可変長ヘッダであり，ルータでのチェックサム計算が必須である", "イ": "固定長40バイトであり，拡張機能はNext Headerフィールドでチェーン構造として付加される", "ウ": "フラグメンテーション制御フィールドが基本ヘッダ内に常時含まれる", "エ": "ブロードキャスト通信を指示する専用フラグが存在する" }, answer: "イ",
    explanation: "IPv6の基本ヘッダは40バイト固定でチェックサムが廃止され処理が高速化されています。ホップバイホップやフラグメント等の機能はNext Headerによる拡張ヘッダとして連結されます。"
  },

  // =========================================================================
  // 問14: IPv6 アドレス自動設定・ICMPv6 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-NDP-01", slot: 14, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "ip", tags: ["ICMPv6", "NDP"],
    question: "IPv6の近隣探索プロトコル (NDP: Neighbor Discovery Protocol) において，IPv4のARPに相当するMACアドレス解決に用いられるメッセージの組み合わせはどれか。",
    choices: { "ア": "ルータ要請 (RS) と ルータ広告 (RA)", "イ": "Echo Request と Echo Reply", "ウ": "近隣要請 (NS) と 近隣広告 (NA)", "エ": "Redirect と Router Discovery" }, answer: "ウ",
    explanation: "IPv6ではブロードキャストARPの代わりに、要請ノードマルチキャストを用いた近隣要請 (Neighbor Solicitation: NS) と近隣広告 (Neighbor Advertisement: NA) でMACアドレスを解決します。"
  },
  {
    masterId: "M-NDP-02", slot: 14, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "ip", tags: ["SLAAC", "EUI-64"],
    question: "IPv6のステートレス自動設定 (SLAAC) において，ルータから受信したプレフィックスと自身のMACアドレスからEUI-64形式でインタフェースIDを生成する際，MACアドレスの中央に挿入される16ビット値はどれか。",
    choices: { "ア": "FFFF", "イ": "0000", "ウ": "FFFE", "エ": "FE80" }, answer: "ウ",
    explanation: "EUI-64では、48ビットのMACアドレスの中央に「FF-FE」の16ビットを挿入し、先頭第7ビット（U/Lビット）を反転させて64ビットのインタフェースIDを生成します。"
  },
  {
    masterId: "M-NDP-03", slot: 14, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "ip", tags: ["DHCPv6", "SLAAC"],
    question: "IPv6において，IPアドレス自体はSLAACで自動生成し，DNSサーバのアドレス等の付加情報のみをDHCPv6サーバから取得する方式はどれか。",
    choices: { "ア": "ステートレスDHCPv6", "イ": "ステートフルDHCPv6", "ウ": "DHCPリレー", "エ": "Static DHCP" }, answer: "ア",
    explanation: "RAのOフラグ (OtherConfig) を1に設定することで、アドレスはSLAACで生成し、DNSやドメイン等の設定のみをDHCPv6から取得する「ステートレスDHCPv6」が動作します。"
  },
  {
    masterId: "M-NDP-04", slot: 14, years: ["H27", "R4"],
    category: "network", subcategory: "ip", tags: ["DAD", "重複検知"],
    question: "IPv6端末が新規に生成した自身のユニキャストアドレスを使用開始する前に，同一リンク上に重複がないか確認する処理 (DAD) の手順として正しいものはどれか。",
    choices: { "ア": "生成したアドレスを対象とする近隣要請 (NS) を送信し，近隣広告 (NA) が返らないことを確認する", "イ": "ルータ広告 (RA) に自身のMACアドレスを登録要求する", "ウ": "DHCPv6サーバに照会して重複リストと照合する", "エ": "全端末に対してICMPv6 Echo Requestを一斉同報する" }, answer: "ア",
    explanation: "DADでは、送信元アドレスを未指定 (::) とした近隣要請 (NS) を自分自身の要請ノードマルチキャスト宛てに送信し、他の端末からNAが返ってこなければ重複なしと判断します。"
  },

  // =========================================================================
  // 問15: NAT / NAPT / IPv4枯渇対策 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-NAT-01", slot: 15, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "ip", tags: ["NAPT", "IPマスカレード"],
    question: "プライベートIPアドレスを持つ複数の社内端末が，1個のグローバルIPアドレスを共有してインターネットに同時アクセスできるように，ポート番号も併せて変換する技術はどれか。",
    choices: { "ア": "スタティックNAT", "イ": "ARP", "ウ": "DNSラウンドロビン", "エ": "NAPT (IPマスカレード)" }, answer: "エ",
    explanation: "NAPT (Network Address Port Translation: IPマスカレード) は、送信元プライベートIPアドレスと送信元ポート番号を、ルータのグローバルIPと未使用ポート番号に対応付けて変換します。"
  },
  {
    masterId: "M-NAT-02", slot: 15, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "ip", tags: ["NATトラバーサル", "STUN"],
    question: "VoIPやWebRTCなどのP2P通信において，NAT配下にあるクライアントが外部サーバを利用して自身のグローバルIPと外部ポート番号を把握するプロトコルはどれか。",
    choices: { "ア": "RADIUS", "イ": "STUN", "ウ": "BGP", "エ": "SNMP" }, answer: "イ",
    explanation: "STUN (Session Traversal Utilities for NAT: RFC 5389) は、NAT配下の端末が外部のSTUNサーバと通信することで自身のマッピングされたグローバルIP・ポート番号を特定するNAT越え技術です。"
  },
  {
    masterId: "M-NAT-03", slot: 15, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "ip", tags: ["NAT64", "DNS64"],
    question: "IPv6オンリーのクライアント環境から，IPv4オンリーのWebサーバへの通信を可能にするゲートウェイ技術の組み合わせはどれか。",
    choices: { "ア": "DS-Lite と MAP-E", "イ": "IPsec と L2TP", "ウ": "NAT64 と DNS64", "エ": "6to4 と Teredo" }, answer: "ウ",
    explanation: "DNS64がIPv4サーバのAレコードから合成IPv6アドレス(プレフィックス付き)を生成し、クライアントからのIPv6パケットをNAT64ルータがIPv4パケットにプロキシ変換します。"
  },
  {
    masterId: "M-NAT-04", slot: 15, years: ["H27", "R4"],
    category: "network", subcategory: "ip", tags: ["CGNAT", "RFC 6598"],
    question: "ISP等の通信事業者が加入者ネットワークに大規模に展開するキャリアグレードNAT (CGNAT / LSN) において，加入者側に割り当てられるRFC 6598の共有アドレス空間プレフィックスはどれか。",
    choices: { "ア": "100.64.0.0/10", "イ": "10.0.0.0/8", "ウ": "172.16.0.0/12", "エ": "192.0.2.0/24" }, answer: "ア",
    explanation: "RFC 6598では、ISP内部でのCGNAT配下端末用として共有アドレスブロック 100.64.0.0/10 (100.64.0.0〜100.127.255.255) が標準定義されています。"
  },

  // =========================================================================
  // 問16: TCP接続制御・ハンドシェイク (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-TCP-01", slot: 16, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "tcp_udp", tags: ["TCP", "3ウェイハンドシェイク"],
    question: "TCPの接続確立（3ウェイハンドシェイク）において，クライアントとサーバ間でやり取りされるコントロールフラグの順序として，正しいものはどれか。",
    choices: { "ア": "SYN → ACK → SYN+ACK", "イ": "ACK → SYN → ACK", "ウ": "SYN → SYN+ACK → ACK", "エ": "FIN → ACK → FIN+ACK" }, answer: "ウ",
    explanation: "クライアントが接続開始を要求するSYNを送り、サーバが受諾と自身の初期シーケンス番号を含むSYN+ACKを返し、クライアントがACKを返送することで接続が確立します。"
  },
  {
    masterId: "M-TCP-02", slot: 16, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "tcp_udp", tags: ["TCP", "TIME_WAIT"],
    question: "TCPコネクションの切断処理において，能動的切断（アクティブクローズ）を行った側が最終ACK送信後に「TIME_WAIT」状態で待機する目的はどれか。",
    choices: { "ア": "サーバ側のポート番号を即座に他プロセスに再割り当てする", "イ": "遅延していた古いパケットが新たなコネクションに混入するのを防ぎ，最終ACKの再送に備える", "ウ": "未送信データの再暗号化処理を完了させる", "エ": "TCP接続の生存時間をゼロにリセットする" }, answer: "イ",
    explanation: "最終ACKが喪失して相手からFINが再送された場合への応答、およびネットワーク内に残存していたパケットが新規コネクションと混同されるのを防ぐため、2MSLの間TIME_WAITで待機します。"
  },
  {
    masterId: "M-TCP-03", slot: 16, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "tcp_udp", tags: ["TCP", "RST"],
    question: "TCP通信において，待機していないポート宛てのSYNを受信した場合や，異常切断時に直ちにコネクションを強制終了するために送信されるフラグはどれか。",
    choices: { "ア": "RST", "イ": "URG", "ウ": "PSH", "エ": "ECE" }, answer: "ア",
    explanation: "RST (Reset) フラグは、リッスンしていないポートへの接続要求を拒否する場合や、異常事態でハンドシェイクを行わずに接続を即座に破棄する場合に送信されます。"
  },
  {
    masterId: "M-TCP-04", slot: 16, years: ["H27", "R4"],
    category: "network", subcategory: "security", tags: ["SYN Flood", "SYN Cookie"],
    question: "TCPのSYNパケットを大量に送りつけて接続キューを枯渇させるSYN Flood攻撃に対し，サーバ側がメモリ上に接続状態を保持せずシーケンス番号にハッシュを埋め込んで対抗する技術はどれか。",
    choices: { "ア": "Reverse Path Forwarding", "イ": "SYN Cookie", "ウ": "TCP Wrapper", "エ": "ポートブロッキング" }, answer: "イ",
    explanation: "SYN Cookieは、初期シーケンス番号 (ISN) の中にIP・ポート・時刻・秘密鍵から生成した暗号学的ハッシュを埋め込み、3ウェイハンドシェイク完了(ACK受信)時までメモリを確保しない防衛策です。"
  },

  // =========================================================================
  // 問17: TCP輻輳制御・スライディングウィンドウ (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-TCP-05", slot: 17, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "tcp_udp", tags: ["TCP", "ウィンドウ制御"],
    question: "TCPのスライディングウィンドウ制御に関する記述として，適切なものはどれか。",
    choices: { "ア": "パケットを1個送信するごとに必ず受信確認ACKが届くまで次の送信を待機する", "イ": "受信側が指定したウィンドウサイズ以内であれば，ACKを待たずに連続して複数のセグメントを送信できる", "ウ": "送信元が送信帯域を固定レートで予約する", "エ": "ルータがパケットをバッファリングする容量のみを指す" }, answer: "イ",
    explanation: "スライディングウィンドウにより、パイプライン的に受信側の受信用バッファ容量（ウィンドウサイズ）の範囲内でACK未達のままパケットを連続送信して高速通信を実現します。"
  },
  {
    masterId: "M-TCP-06", slot: 17, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "tcp_udp", tags: ["TCP", "輻輳制御"],
    question: "TCPの輻輳制御において，通信開始時に輻輳ウィンドウサイズを1MSSから開始し，ACKを受信するたびにウィンドウサイズを指数関数的に倍増させていく段階はどれか。",
    choices: { "ア": "スロースタート", "イ": "輻輳回避", "ウ": "高速再転送", "エ": "高速回復" }, answer: "ア",
    explanation: "スロースタートフェーズでは、1 RTTごとに輻輳ウィンドウが倍増（指数関数的増加）し、ssthresh (スロースタート閾値) に達すると線形増加する「輻輳回避フェーズ」へ移行します。"
  },
  {
    masterId: "M-TCP-07", slot: 17, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "tcp_udp", tags: ["BBR", "TCP輻輳制御"],
    question: "パケットロスではなく，ボトルネック回線の伝送帯域 (Bottleneck Bandwidth) と往復遅延時間 (RTT) を実測して最適な送信レートを決定する，Google開発の最新TCP輻輳制御アルゴリズムはどれか。",
    choices: { "ア": "CUBIC", "イ": "Reno", "ウ": "Vegas", "エ": "BBR" }, answer: "エ",
    explanation: "BBR (Bottleneck Bandwidth and RTT) は、パケットロスを検知してからレートを下げる旧来方式と異なり、回線の物理帯域とRTTを直接モデル化してキュー滞留とパケットロスを抑制します。"
  },
  {
    masterId: "M-TCP-08", slot: 17, years: ["H27", "R4"],
    category: "network", subcategory: "tcp_udp", tags: ["ウィンドウスケール", "TCP"],
    question: "TCP標準ヘッダのウィンドウサイズフィールドは16ビット（最大65,535バイト）ですが，長距離ギガビット回線 (LFN) で大容量データを転送するために最大1GBまで拡張するオプションはどれか。",
    choices: { "ア": "ウィンドウスケールオプション (RFC 1323)", "イ": "SACK (選択確認応答)", "ウ": "TFO (TCP Fast Open)", "エ": "タイムスタンプオプション" }, answer: "ア",
    explanation: "RFC 1323で規定されたウィンドウスケールオプションにより、ウィンドウ値を最大14ビットシフト（2^14 = 16,384倍）し、最大約1GBのウィンドウサイズを扱えるようにします。"
  },

  // =========================================================================
  // 問18: ルーティング基礎・RIP (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-RIP-01", slot: 18, years: ["H21", "H25", "H28", "R1", "R5"],
    category: "network", subcategory: "routing", tags: ["RIP", "スプリットホライズン"],
    question: "ディスタンスベクタ型プロトコル (RIP) において，あるインタフェースから学習した経路情報を，同一のインタフェースからは送り返さないことでルーティングループを防ぐ仕組みはどれか。",
    choices: { "ア": "スプリットホライズン", "イ": "ポイズンリバース", "ウ": "トリガードアップデート", "エ": "ホールドダウンタイマ" }, answer: "ア",
    explanation: "スプリットホライズン (Split Horizon) は、受信した経路を受信元インターフェースへ再度広報することを禁止し、2ノード間の無限カウントループを未然に防止します。"
  },
  {
    masterId: "M-RIP-02", slot: 18, years: ["H22", "H26", "H29", "R2", "R6"],
    category: "network", subcategory: "routing", tags: ["ルーティング", "リンクステート"],
    question: "ディスタンスベクタ型ルーティングプロトコルと比較したときの，リンクステート型ルーティングプロトコル (OSPF等) の特徴として適切なものはどれか。",
    choices: { "ア": "隣接ルータから受け取ったホップ数情報のみに基づいて次ホップを決定する", "イ": "定期的にルーティングテーブル全体をブロードキャストする", "ウ": "各ルータがネットワーク全体のトポロジ図（リンクステートDB）を保持し，ダイクストラ法で最短経路を計算する", "エ": "収束（コンバージェンス）時間が非常に遅い" }, answer: "ウ",
    explanation: "リンクステート型では、ルータが全域のLSAを収集して同一のLSDBを保持し、SPF (Dijkstra) アルゴリズムでループのない最短パスツリーを自律計算します。"
  },
  {
    masterId: "M-RIP-03", slot: 18, years: ["H23", "H27", "H30", "R3", "R7"],
    category: "network", subcategory: "routing", tags: ["再配布", "ルーティング"],
    question: "OSPFとBGPなど異なるルーティングプロトコル間で経路を相互注入（再配布: Redistribution）する際，経路ループを防ぐための推奨策として適切なものはどれか。",
    choices: { "ア": "両プロトコルのメトリック値を強制的に0にする", "イ": "ルートタグを付加して，一方から他方へ注入された経路が再び戻らないようフィルタリングする", "ウ": "再配布ルータを必ず1台のみに限定し冗長化しない", "エ": "両方のプロトコルの管理ディスタンス値を同一にする" }, answer: "イ",
    explanation: "相互再配布を行う複数ルータがある場合、再配布時にルートタグ(Route Tag)を付与し、同じ経路が別ルータから逆流して再注入されるのをルートマップで除外します。"
  },
  {
    masterId: "M-RIP-04", slot: 18, years: ["H24", "R4"],
    category: "network", subcategory: "routing", tags: ["スタティックルート", "浮動ルート"],
    question: "動的ルーティングプロトコルによる主系経路の障害時にのみバックアップとして有効化されるよう，管理ディスタンス (AD) 値を意図的に大きく設定したスタティックルートはどれか。",
    choices: { "ア": "フローティングスタティックルート", "イ": "デフォルトルート", "ウ": "サマリルート", "エ": "ブラックホールルート" }, answer: "ア",
    explanation: "フローティングスタティックルートは、通常経路のAD値（OSPF=110など）より大きなAD値（例えば200）を設定しておくことで、主系経路が消滅した時のみルーティングテーブルに出現します。"
  },

  // =========================================================================
  // 問19: OSPF (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-OSPF-01", slot: 19, years: ["H21", "H25", "H28", "R1", "R5"],
    category: "network", subcategory: "routing", tags: ["OSPF", "DR選定"],
    question: "OSPFのブロードキャストマルチアクセスネットワークにおいて，DR (Designated Router: 指定ルータ) を選定する際の優先順位として正しいものはどれか。",
    choices: { "ア": "ルータプライオリティが最大のもの（同値ならルータIDが最大のもの）", "イ": "IPアドレスが最小のもの", "ウ": "接続されているホスト数が最多のもの", "エ": "MACアドレスが最小のもの" }, answer: "ア",
    explanation: "DR/BDR選定では、インターフェースのOSPFプライオリティ値が最も高いルータが選ばれ、プライオリティ値が同じ場合はルータID（32ビット数値）が最大のものが選定されます。"
  },
  {
    masterId: "M-OSPF-02", slot: 19, years: ["H22", "H26", "H29", "R2", "R6"],
    category: "network", subcategory: "routing", tags: ["OSPF", "エリア構造"],
    question: "OSPFの階層構造において，バックボーンエリア（エリア0）と他の非バックボーンエリアを相互接続するルータの呼称はどれか。",
    choices: { "ア": "ASBR (AS境界ルータ)", "イ": "ABR (エリア境界ルータ)", "ウ": "DR (指定ルータ)", "エ": "BDR (バックアップ指定ルータ)" }, answer: "イ",
    explanation: "エリア境界ルータ (ABR: Area Border Router) はバックボーンエリア0と一般エリアの双方に所属し、エリア間のLSA集約・中継を担います。外部ASと接続するのはASBRです。"
  },
  {
    masterId: "M-OSPF-03", slot: 19, years: ["H23", "H27", "H30", "R3", "R7"],
    category: "network", subcategory: "routing", tags: ["OSPF", "LSA"],
    question: "OSPFにおいて，AS外部のプロトコル（BGPやスタティック）からOSPFドメイン内に注入された外部経路情報を伝達するLSAタイプはどれか。",
    choices: { "ア": "Type 1 (Router LSA)", "イ": "Type 3 (Summary LSA)", "ウ": "Type 7 (NSSA External LSA)", "エ": "Type 5 (AS External LSA)" }, answer: "エ",
    explanation: "ASBRによって生成され、OSPFドメイン全体にフラッディングされる外部経路情報は Type 5 (AS External LSA) です。"
  },
  {
    masterId: "M-OSPF-04", slot: 19, years: ["H24", "R4"],
    category: "network", subcategory: "routing", tags: ["OSPF", "ネイバー"],
    question: "OSPFルータ同士がHelloパケットを交換し，互いのHelloパケット内のネイバーリストに相手のルータIDを確認した状態を表すステータスはどれか。",
    choices: { "ア": "Init", "イ": "2-Way", "ウ": "ExStart", "エ": "Full" }, answer: "イ",
    explanation: "相手のHello内に自分のルータIDを確認すると双方向の疎通が確認された「2-Way」状態となります。マルチアクセス網ではこの段階でDR/BDRの選定が行われます。"
  },

  // =========================================================================
  // 問20: BGP-4 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-BGP-01", slot: 20, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "routing", tags: ["BGP", "AS_PATH"],
    question: "BGP-4において，受信した経路のAS_PATH属性の中に自分自身のAS番号が含まれていた場合のBGPルータの動作はどれか。",
    choices: { "ア": "最高優先の経路としてルーティングテーブルに登録する", "イ": "ルーティングループと判断してその経路を廃棄する", "ウ": "AS番号を削除して再広報する", "エ": "MED値を最大に設定して受け入れる" }, answer: "イ",
    explanation: "BGPはパスベクタ型プロトコルであり、AS_PATH属性に自AS番号が含まれている場合はループが発生していると判定してその経路を無条件に破棄します。"
  },
  {
    masterId: "M-BGP-02", slot: 20, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "routing", tags: ["BGP", "ベストパス"],
    question: "BGP-4における同一宛先へのベストパス選定順序として，最も優先度が高い属性はどれか。",
    choices: { "ア": "AS_PATH長が最短", "イ": "MED値が最小", "ウ": "LOCAL_PREF (ローカルプレファレンス) が最大", "エ": "ルータIDが最小" }, answer: "ウ",
    explanation: "BGPのパス選定では、CiscoのWeightを除き、標準規格上は「LOCAL_PREF最大」が最優先され、次に自ルータ生成経路、その次に「AS_PATH最短」が比較されます。"
  },
  {
    masterId: "M-BGP-03", slot: 20, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "routing", tags: ["BGP", "4バイトAS"],
    question: "BGP-4においてAS番号の枯渇対策として導入された「4バイトAS番号 (RFC 4893)」において，非対応の旧ルータとの互換性を保つために予約された特殊AS番号はどれか。",
    choices: { "ア": "65535", "イ": "64512", "ウ": "0", "エ": "23456 (AS_TRANS)" }, answer: "エ",
    explanation: "2バイトAS対応のみの旧ルータと対向する際、4バイトAS対応ルータは旧ルータ向けのピアに対して自AS番号として「23456 (AS_TRANS)」を通知し互換性を維持します。"
  },
  {
    masterId: "M-BGP-04", slot: 20, years: ["H27", "R4"],
    category: "network", subcategory: "routing", tags: ["BGP", "ルートリフレクタ"],
    question: "iBGP (内部BGP) において，ルーティングループ防止規則により生じるフルメッシュ接続要件を解消するために導入される技術はどれか。",
    choices: { "ア": "ルートリフレクタ (Route Reflector)", "イ": "スプリットホライズン", "ウ": "コンフェデレーション", "エ": "ルート集約" }, answer: "ア",
    explanation: "iBGPではピアから受け取った経路を他のiBGPピアへ転送できない規則がありますが、ルートリフレクタ(RR)を配置することで、クライアント宛てに経路を反射(reflect)してフルメッシュを不要にします。"
  },

  // =========================================================================
  // 問21: DNS (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-DNS-01", slot: 21, years: ["H21", "H24", "H28", "R1", "R5"],
    category: "network", subcategory: "dns", tags: ["DNS", "レコードタイプ"],
    question: "DNSレコードのうち，ドメイン名宛ての電子メールを配送すべきメールサーバのホスト名と優先度を指定するものはどれか。",
    choices: { "ア": "Aレコード", "イ": "CNAMEレコード", "ウ": "MXレコード", "エ": "PTRレコード" }, answer: "ウ",
    explanation: "MX (Mail Exchange) レコードは、ドメイン宛てのメールを受信するサーバのFQDNと優先度(Preference値)を定義します。"
  },
  {
    masterId: "M-DNS-02", slot: 21, years: ["H22", "H25", "H29", "R2", "R6"],
    category: "network", subcategory: "dns", tags: ["DNS", "再帰問い合わせ"],
    question: "DNSの名前解決において，PC等の端末（スタブリゾルバ）が社内のキャッシュDNSサーバに対して行う名前解決の問い合わせ方式はどれか。",
    choices: { "ア": "反復的問い合わせ (Iterative Query)", "イ": "ゾーン転送要求 (AXFR)", "ウ": "再帰的問い合わせ (Recursive Query)", "エ": "ダイナミックDNS更新" }, answer: "ウ",
    explanation: "クライアントは最終的な回答（IPアドレスまたはエラー）が得られるまでサーバ側に探索を要求する「再帰的問い合わせ」を行い、キャッシュDNSサーバは各権威DNSへ「反復的問い合わせ」を繰り返します。"
  },
  {
    masterId: "M-DNS-03", slot: 21, years: ["H23", "H26", "H30", "R3", "R7"],
    category: "network", subcategory: "dns", tags: ["DNS", "カミンスキー攻撃"],
    question: "DNSキャッシュポイズニング攻撃（カミンスキー攻撃）の成功率を大幅に低下させるための対策として，最も有効なキャッシュDNSサーバの設定はどれか。",
    choices: { "ア": "問い合わせ送信元のUDPポート番号をランダム化する (Source Port Randomization)", "イ": "DNS問い合わせをすべてTCPに限定する", "ウ": "キャッシュ保持時間 (TTL) を極限まで長く設定する", "エ": "すべての外部ドメインに対してゾーン転送を要求する" }, answer: "ア",
    explanation: "トランザクションID (16bit) に加え、送信元UDPポート番号 (16bit) をランダム化 (SPR) することで、攻撃者が偽応答を的中させる確率を約6万5千分の1から約40億分の1に低減します。"
  },
  {
    masterId: "M-DNS-04", slot: 21, years: ["H27", "R4"],
    category: "network", subcategory: "security", tags: ["DNSアンプ", "DDoS"],
    question: "インターネット上のオープンリゾルバを踏み台として，送信元IPを標的サーバに偽装した小さなDNS要求を送り，標的に巨大な応答を浴びせるDDoS攻撃はどれか。",
    choices: { "ア": "DNSキャッシュポイズニング", "イ": "DNSアンプ攻撃 (DNS Amplification Attack)", "ウ": "DNSトンネリング", "エ": "ファーミング" }, answer: "イ",
    explanation: "EDNS0による大きなANY応答などを利用し、送信元偽装UDPにより数十倍〜百倍のデータ量を標的へ集中させる攻撃をDNSアンプ攻撃と呼びます。"
  },

  // =========================================================================
  // 問22: DNSSEC (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-DNSSEC-01", slot: 22, years: ["H21", "H24", "H27", "H30", "R3", "R7"],
    category: "network", subcategory: "dns", tags: ["DNSSEC", "電子署名"],
    question: "DNSSECにおいて，各DNSリソースレコードセット (RRset) の正当性を保証するために付加されるデジタル署名情報を含むレコードはどれか。",
    choices: { "ア": "DNSKEY", "イ": "DS", "ウ": "NSEC", "エ": "RRSIG" }, answer: "エ",
    explanation: "DNSSECでは、ゾーン内の各RRsetに対してZSK (ゾーン署名鍵) で生成された電子署名が「RRSIG」レコードとして登録されます。"
  },
  {
    masterId: "M-DNSSEC-02", slot: 22, years: ["H22", "H25", "H28", "R1", "R5"],
    category: "network", subcategory: "dns", tags: ["DNSSEC", "DSレコード"],
    question: "DNSSECの「信頼の連鎖」において，子ゾーンの公開鍵 (DNSKEY) のハッシュ値を親ゾーンに登録し，親から子への委任を暗号学的に証明するレコードはどれか。",
    choices: { "ア": "NSレコード", "イ": "DS (Delegation Signer) レコード", "ウ": "SOAレコード", "エ": "CNAMEレコード" }, answer: "イ",
    explanation: "親ゾーンに登録されたDSレコードが子ゾーンのKSK (鍵署名鍵) のハッシュを含み、親の署名によって保護されることで、ルートからの信頼の連鎖が成立します。"
  },
  {
    masterId: "M-DNSSEC-03", slot: 22, years: ["H26", "H29", "R2", "R4", "R6"],
    category: "network", subcategory: "dns", tags: ["DNSSEC", "NSEC3"],
    question: "DNSSECにおいて，要求されたドメイン名が存在しないこと（不存在証明）をゾーン内の全ドメイン名を暴露することなく証明する方式はどれか。",
    choices: { "ア": "NSEC", "イ": "RRSIG", "ウ": "PTR", "エ": "NSEC3" }, answer: "エ",
    explanation: "従来のNSECレコードはアルファベット順の次ドメイン名を平文で示すためゾーン列挙（ゾーン内容漏洩）が可能でしたが、NSEC3はハッシュ値とソルトを用いてこれを防ぎます。"
  },
  {
    masterId: "M-DNSSEC-04", slot: 22, years: ["H23"],
    category: "network", subcategory: "dns", tags: ["TSIG", "ゾーン転送"],
    question: "プライマリDNSサーバとセカンダリDNSサーバ間のゾーン転送 (AXFR) において，共有秘密鍵によるHMAC認証を用いて改ざんや不正転送を防ぐ技術はどれか。",
    choices: { "ア": "TSIG (Transaction Signature)", "イ": "DNSSEC", "ウ": "SSH", "エ": "TLS" }, answer: "ア",
    explanation: "TSIG (RFC 2845) は、事前共有鍵に基づくメッセージ認証コード (HMAC) をDNSパケット末尾に付加し、ゾーン転送や動的更新の完全性と認証を提供します。"
  },

  // =========================================================================
  // 問23: HTTP / Webプロトコル (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-HTTP-01", slot: 23, years: ["H21", "H25", "H29", "R1", "R5"],
    category: "network", subcategory: "http", tags: ["HTTP/2", "HPACK"],
    question: "HTTP/2において，同一TCPコネクション上で複数リクエスト/レスポンスを並行処理する「多重化」およびヘッダ圧縮を行う技術仕様はどれか。",
    choices: { "ア": "バイナリフレーミング と HPACK", "イ": "テキストコマンド と gzip", "ウ": "UDP通信 と Brotli", "エ": "Cookie と WebSocket" }, answer: "ア",
    explanation: "HTTP/2は通信をバイナリフレームに細分化して1本のTCP上で多重化し、冗長なHTTPヘッダを静的/動的テーブルを用いるHPACKで圧縮します。"
  },
  {
    masterId: "M-HTTP-02", slot: 23, years: ["H26", "H30", "R3", "R6", "R7"],
    category: "network", subcategory: "http", tags: ["HTTP/3", "QUIC"],
    question: "HTTP/3のトランスポート層として採用され，UDP上でTLS 1.3暗号化と0-RTT接続，独立ストリームによるヘッドオブラインブロッキング解消を実現するプロトコルはどれか。",
    choices: { "ア": "TCP", "イ": "SCTP", "ウ": "DCCP", "エ": "QUIC" }, answer: "エ",
    explanation: "HTTP/3はQUIC (RFC 9000: UDP 443番) を採用し、パケットロス発生時にも他の独立ストリームがブロックされない構造を持ちます。"
  },
  {
    masterId: "M-HTTP-03", slot: 23, years: ["H22", "H27", "R2", "R4"],
    category: "network", subcategory: "http", tags: ["HTTP/1.1", "Keep-Alive"],
    question: "HTTP/1.1の持続的接続 (Keep-Alive) の特徴として，適切なものはどれか。",
    choices: { "ア": "通信内容が自動的に共通鍵暗号で暗号化される", "イ": "1回のTCPコネクション接続で，複数のHTTPリクエスト/レスポンスを連続してやり取りできる", "ウ": "サーバ側から任意のタイミングでクライアントへプッシュ通知できる", "エ": "パケット損失時に物理リンクごと再接続する" }, answer: "イ",
    explanation: "HTTP/1.0ではリクエスト毎に3ウェイハンドシェイクと切断を繰り返していましたが、HTTP/1.1のKeep-Aliveでは同一コネクションを再利用して遅延を削減します。"
  },
  {
    masterId: "M-HTTP-04", slot: 23, years: ["H23", "H28"],
    category: "network", subcategory: "http", tags: ["REST", "HTTPメソッド"],
    question: "RESTful APIにおいて，リソースの作成や更新を何度実行しても同じ結果となる性質（べき等性: Idempotent）を持つHTTPメソッドの組み合わせはどれか。",
    choices: { "ア": "POST, PUT", "イ": "POST, PATCH", "ウ": "GET, PUT, DELETE", "エ": "POST, GET" }, answer: "ウ",
    explanation: "べき等とは、ある操作を1回行っても複数回行っても同じ結果になる性質です。GET、PUT、DELETEはべき等ですが、POSTは新規リソースを重複作成するためべき等ではありません。"
  },
  {
    masterId: "M-HTTP-05", slot: 23, years: ["H24"],
    category: "network", subcategory: "http", tags: ["Cookie", "セキュリティ"],
    question: "WebアプリケーションのCookieにおいて，JavaScriptからのアクセスを禁止しXSSによるセッションハイジャックを防ぐ属性はどれか。",
    choices: { "ア": "Secure", "イ": "SameSite", "ウ": "Domain", "エ": "HttpOnly" }, answer: "エ",
    explanation: "HttpOnly属性を付加されたCookieはブラウザのJavaScript (document.cookie) から読み取れなくなり、XSS攻撃によるセッションID窃取を防ぎます。"
  },

  // =========================================================================
  // 問24: 電子メール・送信ドメイン認証 (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-MAIL-01", slot: 24, years: ["H21", "H25", "H28", "R1", "R5"],
    category: "network", subcategory: "email", tags: ["SMTP", "コマンド"],
    question: "SMTP (RFC 5321) において，メールの送信元アドレスおよび配送先受取人アドレスを指定するコマンドの正しい順序はどれか。",
    choices: { "ア": "RCPT TO → MAIL FROM", "イ": "MAIL FROM → RCPT TO", "ウ": "HELO → DATA", "エ": "SEND → TO" }, answer: "イ",
    explanation: "SMTPセッションでは、EHLO/HELOの後に「MAIL FROM:<送信元>」でエンベロープFromを指定し、次に「RCPT TO:<宛先>」でエンベロープToを指定し、その後「DATA」でメール本文を送信します。"
  },
  {
    masterId: "M-MAIL-02", slot: 24, years: ["H22", "H26", "H29", "R2", "R6"],
    category: "network", subcategory: "email", tags: ["IMAP4", "POP3"],
    question: "POP3と比較した際のIMAP4 (Internet Message Access Protocol) の特徴として，適切なものはどれか。",
    choices: { "ア": "受信したメールを端末にダウンロードしてサーバ上から直ちに削除する", "イ": "メールの送信プロトコルとしてもそのまま利用できる", "ウ": "メールをサーバ上で一元管理し，フォルダ構造や既読状態を複数端末間で同期できる", "エ": "平文通信のみをサポートし暗号化に対応していない" }, answer: "ウ",
    explanation: "IMAP4はメールをサーバ上で保持・管理し、未読/既読フラグやフォルダ分類をPCやスマホなど複数クライアント間でシームレスに同期できます。"
  },
  {
    masterId: "M-MAIL-03", slot: 24, years: ["H23", "H27", "H30", "R3", "R7"],
    category: "network", subcategory: "email", tags: ["OP25B", "サブミッション"],
    question: "ISPが迷惑メール対策として顧客PCから外部メールサーバへの25番ポート直接通信を遮断するOP25B環境において，正規メール送信に用いられるポートと技術はどれか。",
    choices: { "ア": "ポート110 と POP before SMTP", "イ": "ポート465 と 暗号化なし通信", "ウ": "ポート25 と IPアドレス固定", "エ": "ポート587 (Submission) と SMTP認証 (SMTP-AUTH)" }, answer: "エ",
    explanation: "OP25B下では、サブミッションポート587宛てにSMTP-AUTH（ユーザ名・パスワード認証）を行い、STARTTLSで暗号化してプロバイダの正規メールサーバを経由して送信します。"
  },
  {
    masterId: "M-MAIL-04", slot: 24, years: ["H24", "R4"],
    category: "network", subcategory: "email", tags: ["DMARC", "送信ドメイン認証"],
    question: "送信ドメイン認証技術であるSPFおよびDKIMの認証結果を検証し，認証に失敗したメールの扱い（none, quarantine, reject）を受信側に指示するポリシーフレームワークはどれか。",
    choices: { "ア": "DMARC", "イ": "BIMI", "ウ": "DNSBL", "エ": "STARTTLS" }, answer: "ア",
    explanation: "DMARC (RFC 7489) は、送信元ドメインのDNSにポリシーを公開し、SPF/DKIM認証失敗時の処理（隔離や拒否）を指定するとともに認証状況のレポートを受信します。"
  },

  // =========================================================================
  // 問25: ネットワークセキュリティ・SDN (H21..R7 全17年度)
  // =========================================================================
  {
    masterId: "M-SEC-01", slot: 25, years: ["H21", "H25", "H29", "R1", "R5"],
    category: "security", subcategory: "security", tags: ["IPsec", "ESPトンネル"],
    question: "IPsecのESPトンネルモードにおいて，暗号化されるパケットの範囲として正しいものはどれか。",
    choices: { "ア": "元のIPパケットのペイロード（データ部分）のみ", "イ": "元のIPパケット全体（ヘッダおよびペイロード）", "ウ": "新IPヘッダおよびESPヘッダのみ", "エ": "TCPヘッダのみ" }, answer: "イ",
    explanation: "ESPトンネルモードでは、元のIPパケット全体（元IPヘッダ＋ペイロード）が暗号化され、その外側に新しい外側IPヘッダが付加されて拠点間VPNを形成します。"
  },
  {
    masterId: "M-SEC-02", slot: 25, years: ["H26", "H30", "R3", "R6", "R7"],
    category: "security", subcategory: "security", tags: ["TLS 1.3", "暗号化"],
    question: "TLS 1.3におけるTLS 1.2からの主要な変更点として，適切なものはどれか。",
    choices: { "ア": "共通鍵暗号としてDESやRC4を新たに採用した", "イ": "通信プロトコルをTCPからUDPに強制移行した", "ウ": "ハンドシェイクを1-RTT（再接続時0-RTT）に短縮し，静的RSA等の非PFS暗号スイートを全廃した", "エ": "クライアント証明書による認証を廃止した" }, answer: "ウ",
    explanation: "TLS 1.3では、事前共有鍵や静的RSA暗号鍵交換を廃止してECDHEによる完全前方秘匿性 (PFS) を必須化し、脆弱な古い暗号を削除してハンドシェイクを1往復に高速化しました。"
  },
  {
    masterId: "M-SEC-03", slot: 25, years: ["H22", "H27", "R2", "R4"],
    category: "security", subcategory: "security", tags: ["IEEE 802.1X", "EAP-TLS"],
    question: "IEEE 802.1Xポートベース認証において，クライアントと認証サーバの両方がデジタル証明書を用いて最も安全に相互認証を行うEAP方式はどれか。",
    choices: { "ア": "EAP-MD5", "イ": "PEAP", "ウ": "EAP-TTLS", "エ": "EAP-TLS" }, answer: "エ",
    explanation: "EAP-TLSは、クライアント側とRADIUS認証サーバ側の双方がX.509証明書を検証し合う相互認証方式であり、最も強固なエンタープライズ認証を提供します。"
  },
  {
    masterId: "M-SEC-04", slot: 25, years: ["H23", "H28"],
    category: "network", subcategory: "sdn", tags: ["OpenFlow", "SDN"],
    question: "OpenFlowネットワークにおいて，スイッチがフローテーブルに該当エントリのない未知のパケットを受信した際，コントローラへ判断を仰ぐために送信するメッセージはどれか。",
    choices: { "ア": "Packet-In", "イ": "Packet-Out", "ウ": "Flow-Mod", "エ": "Hello" }, answer: "ア",
    explanation: "スイッチはテーブルミス（未登録フロー）のパケットを受信すると、パケット全体または先頭ヘッダを「Packet-In」メッセージとしてコントローラに転送し、コントローラは「Flow-Mod」でルールを返します。"
  },
  {
    masterId: "M-SEC-05", slot: 25, years: ["H24"],
    category: "network", subcategory: "sdn", tags: ["VXLAN", "オーバーレイ"],
    question: "クラウドデータセンター等で用いられるVXLAN (RFC 7348) において，L2イーサネットフレームをカプセル化するトランスポート層プロトコルおよび識別子 (VNI) のビット長はどれか。",
    choices: { "ア": "TCP (ポート80) と 12ビットVLAN ID (4,096)", "イ": "UDP (ポート4789) と 24ビットVNI (約1,677万)", "ウ": "IPsec と 32ビットSPI", "エ": "GRE と 16ビットKey" }, answer: "イ",
    explanation: "VXLANはUDPポート4789を用いてMACフレームをIPパケット内にカプセル化し、24ビットのVNI (VXLAN Network Identifier) により最大約1,677万個の論理L2セグメントを構成できます。"
  },

  // =========================================================================
  // 令和8年度 予想問題 (PRED-01 〜 PRED-50: 計50問)
  // =========================================================================
  {
    masterId: "PRED-01", slot: 1, years: ["R8"],
    category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "MLO"],
    question: "次世代無線LAN規格であるIEEE 802.11be (Wi-Fi 7) で導入された，複数の異なる周波数帯（2.4GHz/5GHz/6GHz）を束ねて同時送受信を行う機能はどれか。",
    choices: { "ア": "MLO (Multi-Link Operation)", "イ": "OFDMA", "ウ": "TWT", "エ": "1024QAM" }, answer: "ア",
    explanation: "MLO (Multi-Link Operation) は、2.4GHz、5GHz、6GHzの異なる帯域を同時に並行利用（アグリゲーション）することで超低遅延とスループット大幅向上を実現するWi-Fi 7の中核技術です。"
  },
  {
    masterId: "PRED-02", slot: 2, years: ["R8"],
    category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "変調方式"],
    question: "IEEE 802.11be (Wi-Fi 7) において採用された最高次の直交振幅変調方式として，正しいものはどれか。",
    choices: { "ア": "256QAM", "イ": "1024QAM", "ウ": "4096QAM", "エ": "64QAM" }, answer: "ウ",
    explanation: "Wi-Fi 6の1024QAM（1シンボルあたり10ビット）からさらに進化し、Wi-Fi 7では4096QAM (4K-QAM) を採用して1シンボルあたり12ビットを伝送可能です。"
  },
  {
    masterId: "PRED-03", slot: 3, years: ["R8"],
    category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "帯域幅"],
    question: "IEEE 802.11be (Wi-Fi 7) において，6GHz帯等で利用可能となった最大チャネル帯域幅はどれか。",
    choices: { "ア": "80MHz", "イ": "160MHz", "ウ": "320MHz", "エ": "640MHz" }, answer: "ウ",
    explanation: "Wi-Fi 7では、Wi-Fi 6の最大160MHzから倍増となる最大320MHzの超ワイドチャネル帯域幅がサポートされています。"
  },
  {
    masterId: "PRED-04", slot: 4, years: ["R8"],
    category: "network", subcategory: "http", tags: ["QUIC", "トランスポート"],
    question: "HTTP/3を支えるトランスポート層プロトコルQUIC (RFC 9000) において，暗号化ハンドシェイクに標準統合されているプロトコルはどれか。",
    choices: { "ア": "IPsec", "イ": "SSH", "ウ": "TLS 1.2", "エ": "TLS 1.3" }, answer: "エ",
    explanation: "QUICはプロトコル内部にTLS 1.3を完全に統合しており、コネクション確立と暗号化鍵交換を単一の1-RTT（再接続時は0-RTT）で行います。"
  },
  {
    masterId: "PRED-05", slot: 5, years: ["R8"],
    category: "network", subcategory: "http", tags: ["QUIC", "コネクションマイグレーション"],
    question: "QUICにおいて，スマートフォンがWi-Fiからモバイル回線(LTE/5G)へ切り替わりIPアドレスが変更されても，通信が途切れることなくセッションを継続できる仕組みはどれか。",
    choices: { "ア": "コネクションID (Connection ID)", "イ": "MACアドレスルーティング", "ウ": "モバイルIP", "エ": "DNSダイナミックアップデート" }, answer: "ア",
    explanation: "QUICは通信の識別子として4タプル（IP/ポート）ではなく「コネクションID」を使用するため、IPアドレスが変わってもセッションを維持できます。"
  },
  {
    masterId: "PRED-06", slot: 6, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["SRv6", "セグメントルーティング"],
    question: "IPv6の拡張ヘッダであるSegment Routing Header (SRH) を用い，パケット自身に転送経路（SIDリスト）を記録させて柔軟なトラフィックエンジニアリングを行う技術はどれか。",
    choices: { "ア": "MPLS-TE", "イ": "SRv6 (Segment Routing over IPv6)", "ウ": "RSVP-TE", "エ": "L2TPv3" }, answer: "イ",
    explanation: "SRv6はIPv6ルーティング拡張ヘッダ(SRH)の中に128ビットSID (Segment Identifier) のリストを保持させ、ソースルーティングによって柔軟な経路制御を実現します。"
  },
  {
    masterId: "PRED-07", slot: 7, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["EVPN", "BGP"],
    question: "データセンター相互接続やVXLANのコントロールプレーンとして広く採用され，MP-BGPを用いてMACアドレスとIPアドレスの学習・広報を行う技術はどれか。",
    choices: { "ア": "EVPN (Ethernet VPN)", "イ": "RIPng", "ウ": "IS-IS", "エ": "OSPFv3" }, answer: "ア",
    explanation: "BGP EVPN (RFC 7432) は、データプレーンでのフラッディングによるMAC学習を廃止し、BGPのルート交換によってスケーラブルにL2/L3マルチテナント網を構築します。"
  },
  {
    masterId: "PRED-08", slot: 8, years: ["R8"],
    category: "security", subcategory: "security", tags: ["ゼロトラスト", "アーキテクチャ"],
    question: "NIST SP 800-207で標準化されたゼロトラストアーキテクチャ (ZTA) の基本原則として，適切なものはどれか。",
    choices: { "ア": "社内LANの内側に存在する端末は無条件に信頼する", "イ": "すべてのデータソースとコンピューティングサービスをリソースとみなし，ネットワークの位置に関わらず都度動的にアクセスを認証・認可する", "ウ": "VPNによる境界型防御を最優先に強化する", "エ": "パスワード認証のみで全リソースのアクセス制御を行う" }, answer: "イ",
    explanation: "ゼロトラストは「決して信頼せず、常に検証せよ (Never Trust, Always Verify)」を原則とし、境界の内外を問わずアクセスのたびに動的な認可を行います。"
  },
  {
    masterId: "PRED-09", slot: 9, years: ["R8"],
    category: "security", subcategory: "security", tags: ["SASE", "クラウドセキュリティ"],
    question: "Gartnerが提唱した，SD-WANなどのネットワーク機能と，SWG，CASB，ZTNA，FWaaSなどの包括的セキュリティ機能をクラウド上で一元統合して提供するモデルはどれか。",
    choices: { "ア": "SIEM", "イ": "EDR", "ウ": "SASE (Secure Access Service Edge)", "エ": "SOAR" }, answer: "ウ",
    explanation: "SASE (サシー: Secure Access Service Edge) は、エッジやリモートワーク環境における通信とクラウドセキュリティを一元的に統合する最新アーキテクチャです。"
  },
  {
    masterId: "PRED-10", slot: 10, years: ["R8"],
    category: "security", subcategory: "security", tags: ["耐量子暗号", "PQC"],
    question: "将来の量子コンピュータでも現実的な時間で解読できないよう，格子暗号などに基づいてNISTが標準化を進める「ポスト量子暗号 (PQC)」の対象分野はどれか。",
    choices: { "ア": "公開鍵暗号および電子署名（RSAやECDSAの代替）", "イ": "共通鍵暗号AESのブロック長拡張", "ウ": "ハッシュ関数SHA-256の廃止", "エ": "光ファイバの物理層暗号化" }, answer: "ア",
    explanation: "ショアのアルゴリズムにより素因数分解や離散対数問題に依存するRSAや楕円曲線暗号が解読される恐れがあるため、PQC (ML-KEM / ML-DSA等) への移行が進められています。"
  },
  {
    masterId: "PRED-11", slot: 11, years: ["R8"],
    category: "network", subcategory: "dns", tags: ["DoH", "プライバシー"],
    question: "DNSの名前解決トラフィックをTLS暗号化されたHTTPS (ポート443) 上で通信させることで，盗聴やISPによる検閲，中間者攻撃を防ぐ技術はどれか。",
    choices: { "ア": "DoH (DNS over HTTPS)", "イ": "DNSSEC", "ウ": "mDNS", "エ": "Dynamic DNS" }, answer: "ア",
    explanation: "DoH (RFC 8484) は、DNS通信を通常のWeb通信(HTTPS)と見分けがつかない形で暗号化し、経路上の盗聴や改ざんを防止します。"
  },
  {
    masterId: "PRED-12", slot: 12, years: ["R8"],
    category: "network", subcategory: "dns", tags: ["DoQ", "最新プロトコル"],
    question: "DNS over TLS (DoT) のTCPヘッドオブラインブロッキング遅延を解消するため，QUIC上でDNS問い合わせを暗号化転送する規格 (RFC 9250) はどれか。",
    choices: { "ア": "DoQ (DNS over QUIC)", "イ": "DoH", "ウ": "DNSSEC", "エ": "EDNS0" }, answer: "ア",
    explanation: "DoQ (RFC 9250) はQUICを用いてDNS問い合わせを伝送し、超低遅延と0-RTT接続、パケットロス耐性を両立します。"
  },
  {
    masterId: "PRED-13", slot: 13, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["RPKI", "BGPセキュリティ"],
    question: "BGPの経路ハイジャック（悪意ある不正なAS経路広報）を防ぐために，IPアドレス保有者と発信AS番号の正当な対応関係を暗号学的に検証する技術はどれか。",
    choices: { "ア": "RPKI (Resource Public Key Infrastructure) と ROA", "イ": "BGPルートリフレクタ", "ウ": "BFD", "エ": "GREトンネル" }, answer: "ア",
    explanation: "RPKIでは、地域インターネットレジストリ(RIR)が発行するROA (Route Origin Authorization: 経路発信者宣言) に基づき、BGPルータが不正経路を無効化 (Invalid) して遮断します。"
  },
  {
    masterId: "PRED-14", slot: 14, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["BGP", "BGPsec"],
    question: "RPKIの発信者検証(ROV)に加え，BGP経路更新メッセージの通過する全AS経路（AS_PATH）の改ざんをBGPルータ毎のデジタル署名で防止する拡張規格はどれか。",
    choices: { "ア": "BGPsec (RFC 8205)", "イ": "MP-BGP", "ウ": "BGP-LS", "エ": "EBGP" }, answer: "ア",
    explanation: "BGPsecはBGP UpdateメッセージのAS_PATH属性の各ホップに暗号署名を付加し、経路途中の意図的なAS差し替えや偽装を完全に防ぎます。"
  },
  {
    masterId: "PRED-15", slot: 15, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["BFD", "障害検知"],
    question: "ミリ秒単位の極めて短い間隔でキープアライブを交換し，ルーティングプロトコルに依存せず物理・論理リンクの双方向障害を高速検知するプロトコルはどれか。",
    choices: { "ア": "BFD (Bidirectional Forwarding Detection)", "イ": "ICMP Echo", "ウ": "VRRP", "エ": "SNMP Trap" }, answer: "ア",
    explanation: "BFD (RFC 5880) は、OSPFやBGPと連動して数十ミリ秒での障害検知を実現し、ルーティングプロトコルのハロータイマ待機による切り替え遅延を解消します。"
  },
  {
    masterId: "PRED-16", slot: 16, years: ["R8"],
    category: "network", subcategory: "qos", tags: ["ECN", "輻輳制御"],
    question: "ルータがバッファ逼迫時にパケットを廃棄する代わりに，IPヘッダ内の2ビットを用いて送信元にネットワーク混雑を事前通知する技術はどれか。",
    choices: { "ア": "ECN (Explicit Congestion Notification)", "イ": "QoS DiffServ", "ウ": "WRED", "エ": "ACL" }, answer: "ア",
    explanation: "ECN (RFC 3168) は、IPヘッダのECNフィールドに「CE (Congestion Experienced: 11)」をセットし、パケットをドロップすることなく受信側・送信側に輻輳回避を促します。"
  },
  {
    masterId: "PRED-17", slot: 17, years: ["R8"],
    category: "network", subcategory: "qos", tags: ["L4S", "超低遅延"],
    question: "次世代インターネットに向けて策定された，ECNを拡張してキュー滞留遅延をほぼゼロに抑え，大容量通信とミリ秒未満の低遅延を両立する新技術体系はどれか。",
    choices: { "ア": "L4S (Low Latency, Low Loss, Scalable Throughput)", "イ": "IntServ", "ウ": "RSVP", "エ": "IEEE 802.1p" }, answer: "ア",
    explanation: "L4S (RFC 9330) は、従来のパケットドロップ型輻輳制御を排し、ミリ秒単位の高精度ECNマークによって超低遅延・高スループットを実現します。"
  },
  {
    masterId: "PRED-18", slot: 18, years: ["R8"],
    category: "network", subcategory: "qos", tags: ["TSN", "産業用イーサネット"],
    question: "自動運転やスマートファクトリーにおいて，標準イーサネット上でマイクロ秒単位の確定的なリアルタイム通信を保証するIEEE標準規格群はどれか。",
    choices: { "ア": "TSN (Time-Sensitive Networking)", "イ": "1000BASE-T", "ウ": "IEEE 802.1Q", "エ": "IEEE 802.3ad" }, answer: "ア",
    explanation: "TSN (IEEE 802.1 TSNタスクグループ) は、厳密な時刻同期 (IEEE 802.1AS) やタイムアウェアシェーパ (IEEE 802.1Qbv) を規定しています。"
  },
  {
    masterId: "PRED-19", slot: 19, years: ["R8"],
    category: "network", subcategory: "management", tags: ["Telemetry", "ネットワーク可視化"],
    question: "SNMPの定期ポーリング型監視の負荷と遅延を解決するため，ルータ自身がCPUやトラフィック統計情報をイベント駆動でリアルタイムにPush配信する技術はどれか。",
    choices: { "ア": "Streaming Telemetry", "イ": "SNMP GET", "ウ": "Syslog", "エ": "NetFlow v5" }, answer: "ア",
    explanation: "Streaming Telemetry (ストリーミングテレメトリ) は、gRPCやJSON/ProtoBuf等を用いて数秒〜サブ秒間隔で機器の内部メトリクスを自動Push送信します。"
  },
  {
    masterId: "PRED-20", slot: 20, years: ["R8"],
    category: "network", subcategory: "management", tags: ["NETCONF", "YANG"],
    question: "ネットワーク機器の設定管理を自動化するために，XMLベースで設定の送受信を行い，トランザクション（コミット/ロールバック）をサポートするプロトコルはどれか。",
    choices: { "ア": "NETCONF (RFC 6241)", "イ": "SNMP", "ウ": "Telnet", "エ": "TFTP" }, answer: "ア",
    explanation: "NETCONFはSSH等のセキュアなトランスポート上でXMLを用い、設定データモデル言語「YANG」と連携してプログラマブルな一括設定・検証を提供します。"
  },
  {
    masterId: "PRED-21", slot: 21, years: ["R8"],
    category: "network", subcategory: "management", tags: ["RESTCONF", "API"],
    question: "NETCONFのデータモデルであるYANGをベースに，JSONまたはXMLを用いてHTTPベースのREST API経由でネットワーク機器を設定・監視する軽量プロトコルはどれか。",
    choices: { "ア": "RESTCONF (RFC 8040)", "イ": "SOAP", "ウ": "GraphQL", "エ": "CoAP" }, answer: "ア",
    explanation: "RESTCONFは、HTTPSの標準メソッド (GET, POST, PUT, DELETE, PATCH) を使ってYANGモデル化された機器データを操作するモダンな設定管理APIです。"
  },
  {
    masterId: "PRED-22", slot: 22, years: ["R8"],
    category: "security", subcategory: "security", tags: ["ZTNA", "ゼロトラスト"],
    question: "従来のVPNのようにネットワーク全体へのアクセスを許可するのではなく，認証・認可された特定のアプリケーションへのみセキュアな暗号化トンネルを提供する技術はどれか。",
    choices: { "ア": "ZTNA (Zero Trust Network Access)", "イ": "L2TP/IPsec", "ウ": "PPTP", "エ": "リモートデスクトップゲートウェイ" }, answer: "ア",
    explanation: "ZTNA (SDP: Software Defined Perimeter) は端末の健全性やコンテキストを評価した上で、認可された個別アプリケーションへのみセッション単位で接続を確立します。"
  },
  {
    masterId: "PRED-23", slot: 23, years: ["R8"],
    category: "security", subcategory: "security", tags: ["パスキー", "FIDO2"],
    question: "フィッシング攻撃に耐性を持つWebAuthn/FIDO2に基づき，公開鍵暗号と生体認証を組み合わせてパスワード入力を不要にする最新認証標準はどれか。",
    choices: { "ア": "パスキー (Passkey)", "イ": "ワンタイムパスワード (TOTP)", "ウ": "SMS認証", "エ": "BASIC認証" }, answer: "ア",
    explanation: "パスキーは、端末のセキュア領域に秘密鍵を保存し、Webサイト側の公開鍵とチャレンジ＆レスポンス認証を行うため、偽サイトへのパスワード誤入力を根本から防止します。"
  },
  {
    masterId: "PRED-24", slot: 24, years: ["R8"],
    category: "security", subcategory: "security", tags: ["mTLS", "マイクロサービス"],
    question: "マイクロサービスアーキテクチャやサービスメッシュにおいて，サービス間通信の両エンドポイントが互いにX.509証明書を検証し合って暗号化とアクセス制御を行う技術はどれか。",
    choices: { "ア": "mTLS (相互TLS認証)", "イ": "SSLアクセラレータ", "ウ": "Cookieセッション", "エ": "JWT単独認証" }, answer: "ア",
    explanation: "相互TLS (Mutual TLS: mTLS) は、クライアントとサーバ双方が証明書を提示して信頼性を検証し合い、通信の暗号化と厳格なサービス間認可を実現します。"
  },
  {
    masterId: "PRED-25", slot: 25, years: ["R8"],
    category: "security", subcategory: "security", tags: ["CT", "証明書透明性"],
    question: "不正なSSL/TLS証明書の発行や認証局の不正行為を早期に発見するため，発行されたすべての証明書を改ざん不可能な公開監査ログに記録することを義務付ける仕組みはどれか。",
    choices: { "ア": "CT (Certificate Transparency: 証明書の透明性)", "イ": "CRL (証明書失効リスト)", "ウ": "OCSP", "エ": "CAAレコード" }, answer: "ア",
    explanation: "Certificate Transparency (RFC 6962) は、マークルツリー構造の追記型公開ログに全証明書のSCT (Signed Certificate Timestamp) を記録し、ドメイン詐称を公に監視可能にします。"
  },
  {
    masterId: "PRED-26", slot: 26, years: ["R8"],
    category: "network", subcategory: "dns", tags: ["CAA", "DNSセキュリティ"],
    question: "ドメイン所有者が，自ドメインのSSL/TLSサーバ証明書を発行できる認証局 (CA) をDNSレコード上で明示的に宣言し，意図しないCAからの誤発行を防ぐレコードはどれか。",
    choices: { "ア": "CAA (Certification Authority Authorization) レコード", "イ": "TXTレコード", "ウ": "TLSAレコード", "エ": "SRVレコード" }, answer: "ア",
    explanation: "CAAレコード (RFC 8659) は、「example.com. IN CAA 0 issue \"letsencrypt.org\"」のように指定し、認証局が証明書発行前に確認を義務付けられています。"
  },
  {
    masterId: "PRED-27", slot: 27, years: ["R8"],
    category: "network", subcategory: "email", tags: ["BIMI", "ブランド保護"],
    question: "DMARCのポリシーが厳格に適用されている正規送信メールに対し，受信トレイ上で企業の認証済みブランドロゴを表示させる技術仕様はどれか。",
    choices: { "ア": "BIMI (Brand Indicators for Message Identification)", "イ": "S/MIME", "ウ": "PGP", "エ": "VMC" }, answer: "ア",
    explanation: "BIMIは、DMARC（p=quarantineまたはp=reject）の認証に合格したメールに対し、認証マーク証明書 (VMC) と連携して公式ブランドロゴを受信者に表示します。"
  },
  {
    masterId: "PRED-28", slot: 28, years: ["R8"],
    category: "security", subcategory: "security", tags: ["マイクロセグメンテーション", "ゼロトラスト"],
    question: "データセンター内部やクラウド環境において，ワークロード（仮想マシンやコンテナ）単位で細粒度のファイアウォールルールを適用し，ラテラルムーブメント（横展開）を防止する技術はどれか。",
    choices: { "ア": "マイクロセグメンテーション", "イ": "サブネットマスク拡張", "ウ": "DMZ構築", "エ": "NAT64" }, answer: "ア",
    explanation: "マイクロセグメンテーションは、同一サブネット内であってもサーバ間のEast-Westトラフィックを個別にポリシー制御し、侵入時の横感染を極小化します。"
  },
  {
    masterId: "PRED-29", slot: 29, years: ["R8"],
    category: "network", subcategory: "sdn", tags: ["eBPF", "カーネルプログラミング"],
    question: "Linuxカーネルの安全なサンドボックス内で，カーネルの再コンパイルなしに高速なパケット処理や可視化，セキュリティモニタリングを実行可能にする最新技術はどれか。",
    choices: { "ア": "eBPF (Extended Berkeley Packet Filter)", "イ": "DPDK", "ウ": "Open vSwitch", "エ": "Netfilter" }, answer: "ア",
    explanation: "eBPFはCilium等のクラウドネイティブネットワーク基盤で標準採用され、OSカーネルレベルでの超高速パケットルーティングと可視化を提供します。"
  },
  {
    masterId: "PRED-30", slot: 30, years: ["R8"],
    category: "network", subcategory: "ip", tags: ["Anycast", "負荷分散"],
    question: "同一のIPアドレスを地理的に離れた複数のサーバに設定し，BGPルーティングにより利用者からネットワークトポロジ上最も近いサーバへ自動誘導する方式はどれか。",
    choices: { "ア": "エニーキャスト (Anycast)", "イ": "マルチキャスト", "ウ": "ブロードキャスト", "エ": "ユニキャスト" }, answer: "ア",
    explanation: "ルートDNSやパブリックDNS (8.8.8.8, 1.1.1.1)、CDNのエッジサーバでは、BGP Anycastを用いて世界中に分散配置し耐障害性と超低遅延を実現しています。"
  },
  {
    masterId: "PRED-31", slot: 31, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["MP-BGP", "BGP拡張"],
    question: "BGP-4を拡張し，IPv4ユニキャストだけでなくIPv6，VPNv4/v6，EVPNなど多様なアドレスファミリを単一のBGPセッションでルーティング可能にした規格はどれか。",
    choices: { "ア": "MP-BGP (Multi-Protocol BGP)", "イ": "IS-IS", "ウ": "BGP-LS", "エ": "OSPFv3" }, answer: "ア",
    explanation: "MP-BGP (RFC 4760) は、AFI (Address Family Identifier) とSAFIを導入し、多様なプロトコルのプレフィックスやVPNラベルを同時にアドバタイズします。"
  },
  {
    masterId: "PRED-32", slot: 32, years: ["R8"],
    category: "network", subcategory: "switching", tags: ["IEEE 802.1Qcz", "超高信頼"],
    question: "ミッションクリティカルなイーサネットにおいて，パケットの複製を複数の非互いに交差する経路で同時伝送し，受信側で重複排除することでゼロ遅延回復を保証する規格はどれか。",
    choices: { "ア": "FRER (Frame Replication and Elimination for Reliability / IEEE 802.1CB)", "イ": "STP", "ウ": "LACP", "エ": "VRRP" }, answer: "ア",
    explanation: "IEEE 802.1CB (FRER) は、産業用ネットワークや車載ネットワークにおいて、障害発生時の切り替え時間を「0ミリ秒（無瞬断）」にする高信頼化技術です。"
  },
  {
    masterId: "PRED-33", slot: 33, years: ["R8"],
    category: "network", subcategory: "wireless", tags: ["Wi-Fi 7", "320MHz"],
    question: "Wi-Fi 7 (IEEE 802.1be) において，320MHz幅の超広帯域通信が許可されている周波数帯はどれか。",
    choices: { "ア": "6GHz帯", "イ": "2.4GHz帯", "ウ": "5GHz帯 W52", "エ": "5GHz帯 W53" }, answer: "ア",
    explanation: "2.4GHzや5GHz帯では連続した320MHzの空き帯域を確保できませんが、新設された6GHz帯 (5.925〜7.125 GHz) で最大320MHz幅チャネルが利用可能です。"
  },
  {
    masterId: "PRED-34", slot: 34, years: ["R8"],
    category: "network", subcategory: "wireless", tags: ["DFS", "レーダー波"],
    question: "5GHz帯無線LANのW53/W56チャネルにおいて，気象レーダーや航空レーダーを検知した際に電波出力を自動停止し別チャネルに移行する義務機能はどれか。",
    choices: { "ア": "DFS (Dynamic Frequency Selection)", "イ": "TPC (Transmit Power Control)", "ウ": "OFDMA", "エ": "MIMO" }, answer: "ア",
    explanation: "DFSは電波法で義務付けられており、レーダー波を感知すると即座に停波して1分間スキャン後に干渉のないチャネルへ移動します。"
  },
  {
    masterId: "PRED-35", slot: 35, years: ["R8"],
    category: "network", subcategory: "http", tags: ["HTTP/3", "PRIORITY"],
    question: "HTTP/3において，HTML，CSS，画像などの優先度をクライアントが指定し，帯域の配分をサーバに指示するための標準ヘッダはどれか。",
    choices: { "ア": "Priority (RFC 9218)", "イ": "Content-Type", "ウ": "Accept-Encoding", "エ": "X-Forwarded-For" }, answer: "ア",
    explanation: "RFC 9218 (Extensible Prioritization Scheme for HTTP) では、「Priority: u=1, i」のようにurgencyとincrementalを指定してコンテンツ読み込みを最適化します。"
  },
  {
    masterId: "PRED-36", slot: 36, years: ["R8"],
    category: "security", subcategory: "security", tags: ["ECH", "TLS暗号化"],
    question: "TLSハンドシェイクにおいて，平文で送信されていたClientHello内のSNI（接続先ドメイン名）を暗号化し，ISP等による閲覧先Webサイトの盗聴を防ぐ最新技術はどれか。",
    choices: { "ア": "ECH (Encrypted Client Hello)", "イ": "HSTS", "ウ": "HPKP", "エ": "OCSP Stapling" }, answer: "ア",
    explanation: "ECHはDNSのHTTPS/SVCBレコードから取得した公開鍵を用い、ClientHello全体（SNIを含む）を暗号化して通信のプライバシーを完全保護します。"
  },
  {
    masterId: "PRED-37", slot: 37, years: ["R8"],
    category: "network", subcategory: "dns", tags: ["SVCB", "HTTPSレコード"],
    question: "DNSの問い合わせにおいて，対象Webサイトの対応プロトコル（HTTP/3・QUICポート）やECH暗号鍵情報を1回のDNS名前解決で同時に提供する最新レコード種別はどれか。",
    choices: { "ア": "HTTPSレコード (RFC 9460)", "イ": "Aレコード", "ウ": "MXレコード", "エ": "SRVレコード" }, answer: "ア",
    explanation: "HTTPS/SVCBレコードにより、クライアントは事前にHTTP/3のサポート状況やポート番号、ECH公開鍵を把握し、接続遅延を最小化できます。"
  },
  {
    masterId: "PRED-38", slot: 38, years: ["R8"],
    category: "network", subcategory: "ip", tags: ["SRv6", "uSID"],
    question: "SRv6において，IPv6拡張ヘッダのサイズ肥大化を抑えるために，128ビットのIPv6アドレスの中に複数のセグメントIDをパックして圧縮する技術はどれか。",
    choices: { "ア": "Micro-SID (uSID)", "イ": "IPv6ヘッダ圧縮", "ウ": "MPLS", "エ": "GRE" }, answer: "ア",
    explanation: "Micro-SID (uSID: マイクロSID) は、1つの128ビットIPv6アドレスのペイロード部分に複数の16/32ビットSIDを連結し、MTUオーバーヘッドを劇的に低減します。"
  },
  {
    masterId: "PRED-39", slot: 39, years: ["R8"],
    category: "security", subcategory: "security", tags: ["WireGuard", "VPN"],
    question: "IPsecやOpenVPNと比較して，コードベースが約4,000行と非常に小さく，ChaCha20暗号とCurve25519鍵交換を用いてLinuxカーネル内で高速動作する次世代VPNプロトコルはどれか。",
    choices: { "ア": "WireGuard", "イ": "PPTP", "ウ": "L2TP", "エ": "SSTP" }, answer: "ア",
    explanation: "WireGuardは最新の暗号技術を採用した軽量・高速なVPNプロトコルであり、設定が極めてシンプルでローミング耐性に優れています。"
  },
  {
    masterId: "PRED-40", slot: 40, years: ["R8"],
    category: "security", subcategory: "security", tags: ["SSO", "OIDC"],
    question: "OAuth 2.0認可フレームワークをベースに拡張され，JSON Web Token (JWT) 形式の「IDトークン」を用いてユーザ認証と属性情報連携を実現する業界標準仕様はどれか。",
    choices: { "ア": "OpenID Connect (OIDC)", "イ": "SAML 1.1", "ウ": "RADIUS", "エ": "Kerberos" }, answer: "ア",
    explanation: "OpenID Connect (OIDC) は、WebやスマホアプリにおいてGoogleやMicrosoft等のアカウントによるシングルサインオン(SSO)を安全に実現します。"
  },
  {
    masterId: "PRED-41", slot: 41, years: ["R8"],
    category: "security", subcategory: "security", tags: ["OAuth", "PKCE"],
    question: "OAuth 2.0の認可コードグラントフローにおいて，悪意あるアプリによる認可コード横取り攻撃を防ぐために導入された拡張仕様はどれか。",
    choices: { "ア": "PKCE (Proof Key for Code Exchange)", "イ": "Client Secret", "ウ": "Basic Auth", "エ": "Mutual TLS" }, answer: "ア",
    explanation: "PKCE (ピクシー: RFC 7636) は、code_verifierと暗号ハッシュcode_challengeを用いてクライアントが正当な認可コード要求者であることを動的に証明します。"
  },
  {
    masterId: "PRED-42", slot: 42, years: ["R8"],
    category: "security", subcategory: "security", tags: ["CASB", "シャドーIT"],
    question: "クラウドサービスの利用において，従業員のシャドーITの可視化や，機密データの漏洩防止 (DLP)，アクセス権限の監査を行うセキュリティソリューションはどれか。",
    choices: { "ア": "CASB (Cloud Access Security Broker)", "イ": "WAF", "ウ": "IDS", "エ": "SIEM" }, answer: "ア",
    explanation: "CASBは、企業と複数のクラウドサービス間に位置し、シャドーIT検出、データセキュリティ、コンプライアンス監査を集中制御します。"
  },
  {
    masterId: "PRED-43", slot: 43, years: ["R8"],
    category: "network", subcategory: "sdn", tags: ["SD-WAN", "トラフィック制御"],
    question: "インターネット回線や専用線，5G回線などの複数の物理回線を束ね，アプリケーション毎の通信品質要求（遅延やパケットロス率）に応じて動的に最適経路を選択する技術はどれか。",
    choices: { "ア": "SD-WAN (Software-Defined WAN)", "イ": "スタティックルーティング", "ウ": "STP", "エ": "RIP" }, answer: "ア",
    explanation: "SD-WANは、中央コントローラから各拠点エッジを一元制御し、SaaSトラフィックのインターネットブレイクアウトや回線自動フェイルオーバーを提供します。"
  },
  {
    masterId: "PRED-44", slot: 44, years: ["R8"],
    category: "network", subcategory: "routing", tags: ["BGP", "BMP"],
    question: "ルータのBGPセッション状況や受信経路テーブル (RIB-In) を改変することなく，外部の監視分析サーバへそのままリアルタイム転送するプロトコルはどれか。",
    choices: { "ア": "BMP (BGP Monitoring Protocol / RFC 7854)", "イ": "BGP Update", "ウ": "SNMP Walk", "エ": "NetFlow" }, answer: "ア",
    explanation: "BMP (BGP Monitoring Protocol) は、ポリシー適用前後の完全な受信経路情報を監視装置へ送信し、BGP経路フラップや障害を精密に観測できます。"
  },
  {
    masterId: "PRED-45", slot: 45, years: ["R8"],
    category: "network", subcategory: "other", tags: ["RoCE", "RDMA"],
    question: "AI学習やビッグデータ処理において，CPUを介さずにネットワークカード間で直接メモリ転送を行うRDMAを，標準イーサネット網上で実現するプロトコルはどれか。",
    choices: { "ア": "RoCE v2 (RDMA over Converged Ethernet)", "イ": "InfiniBand専用線", "ウ": "iSCSI", "エ": "NFS" }, answer: "ア",
    explanation: "RoCE v2はUDP/IPパケット内にRDMAフレームをカプセル化し、PFC (Priority Flow Control) によるロスレスイーサネット上で超高スループット・超低遅延転送を行います。"
  },
  {
    masterId: "PRED-46", slot: 46, years: ["R8"],
    category: "network", subcategory: "qos", tags: ["PFC", "ロスレスLAN"],
    question: "イーサネットにおいて，バッファが溢れそうになった際にリンク全体を止めるのではなく，特定の優先度キューの送信元にのみ一時停止を要求する規格はどれか。",
    choices: { "ア": "PFC (Priority-based Flow Control / IEEE 802.1Qbb)", "イ": "IEEE 802.3x PAUSE", "ウ": "WRED", "エ": "トークンバケット" }, answer: "ア",
    explanation: "PFCは8段階のCoS値毎に個別のポーズフレームを送信可能にし、AIクラスタやストレージトラフィックのみをパケットドロップなしで転送します。"
  },
  {
    masterId: "PRED-47", slot: 47, years: ["R8"],
    category: "network", subcategory: "management", tags: ["OpenConfig", "ベンダー中立"],
    question: "異なるネットワーク機器ベンダー間（Cisco, Juniper, Arista等）で共通のデータモデルを用いて設定や監視を行うために，大手事業者が共同策定したベンダー非依存のYANGモデル体系はどれか。",
    choices: { "ア": "OpenConfig", "イ": "MIB-II", "ウ": "IEEE YANG", "エ": "IETF RFC" }, answer: "ア",
    explanation: "OpenConfigはGoogleなどの大手ネットワークオペレータが主導し、マルチベンダー環境を統一的に運用自動化するための業界標準モデルです。"
  },
  {
    masterId: "PRED-48", slot: 48, years: ["R8"],
    category: "security", subcategory: "security", tags: ["DEX", "エンドポイント可視化"],
    question: "テレワーク環境において，PCのCPU・メモリ負荷，Wi-Fi電波品質，ISP回線，VPN，SaaSまでの通信品質を統合監視し，ユーザの快適性を定量評価するソリューションはどれか。",
    choices: { "ア": "DEM / DEX (Digital Employee Experience)", "イ": "APM", "ウ": "NPM", "エ": "アンチウイルス" }, answer: "ア",
    explanation: "DEX (Digital Employee Experience) は、エンドポイントに常駐するエージェントとネットワーク監視を融合し、「Teamsが遅い」といったトラブルの原因箇所を即座に特定します。"
  },
  {
    masterId: "PRED-49", slot: 49, years: ["R8"],
    category: "security", subcategory: "security", tags: ["CBRS", "プライベート5G"],
    question: "企業が自社の敷地内や工場内に独自の5G無線ネットワークを構築・運用する「ローカル5G / プライベート5G」の利点として，適切なものはどれか。",
    choices: { "ア": "公衆回線の混雑に左右されず，超低遅延・高セキュリティな自前無線インフラを確保できる", "イ": "Wi-Fiと異なり無線局の免許申請が一切不要である", "ウ": "家庭用の汎用ルータをそのまま利用できる", "エ": "通信距離が無制限で全国どこでも接続できる" }, answer: "ア",
    explanation: "ローカル5Gは専用周波数帯を用いて自社専有ネットワークを構築でき、外部障害や輻輳から隔離された高品質通信を実現します。"
  },
  {
    masterId: "PRED-50", slot: 50, years: ["R8"],
    category: "network", subcategory: "other", tags: ["情報通信白書", "将来ネットワーク"],
    question: "光電融合技術を活用し，端末からサーバ，ネットワークの通信経路全体を電気信号に変換せず光信号のまま伝送することで，消費電力を100分の1，容量を125倍，遅延を200分の1にする次世代通信インフラ構想はどれか。",
    choices: { "ア": "IOWN (Innovative Optical and Wireless Network)", "イ": "Beyond 5G", "ウ": "Starlink", "エ": "LPWA" }, answer: "ア",
    explanation: "IOWN構想（オールフォトニクス・ネットワーク: APN）は、ネットワークの終端まで光技術を適用することで、超大容量・超低遅延・超低消費電力を目指す革新基盤構想です。"
  }
];

// =========================================================================
// フラットな QUESTIONS_DB および REUSE_MAP の自動生成
// =========================================================================
const QUESTIONS_DB = [];
const REUSE_MAP = {};

MASTER_QUESTIONS.forEach(item => {
  const isPred = item.masterId.startsWith("PRED");
  const groupIds = item.years.map(y => `${y}-Q${String(item.slot).padStart(2, '0')}`);

  item.years.forEach(y => {
    const yInfo = YEAR_MAP[y];
    const qId = `${y}-Q${String(item.slot).padStart(2, '0')}`;
    const sameAsList = groupIds.filter(id => id !== qId);

    const qObj = {
      id: qId,
      masterId: item.masterId,
      year: y,
      yearLabel: yInfo ? yInfo.label : y,
      yearNum: yInfo ? yInfo.num : 2020,
      number: item.slot,
      category: item.category,
      subcategory: item.subcategory,
      tags: item.tags ? [...item.tags] : [],
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

// 環境に応じたエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS_DB, REUSE_MAP, CATEGORY_INFO, SUBCATEGORY_INFO, MASTER_QUESTIONS };
} else {
  window.MASTER_QUESTIONS = MASTER_QUESTIONS;
  window.QUESTIONS_DB = QUESTIONS_DB;
  window.REUSE_MAP = REUSE_MAP;
  window.CATEGORY_INFO = CATEGORY_INFO;
  window.SUBCATEGORY_INFO = SUBCATEGORY_INFO;
}
