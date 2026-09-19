// ネットワークスペシャリスト 午前II 問題データベース
// 高度情報処理技術者試験 午前II(科目A-2) 過去問網羅＆同一問題対照データ

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
  wireless: { label: "無線LAN (Wi-Fi 6/WPA3)", category: "network" },
  sdn: { label: "SDN・仮想化 (OpenFlow/VXLAN)", category: "network" },
  qos: { label: "QoS・高信頼化 (VRRP/DiffServ)", category: "network" },
  management: { label: "ネットワーク管理 (SNMP/syslog/NTP)", category: "network" },
  other: { label: "関連知識・信頼性計算", category: "other" }
};

// 単一のマスター問題定義群（同一問題の出題年度一覧を含む）
const MASTER_QUESTIONS = [
  // ===== ルーティング =====
  {
    masterId: "M-ROUT-01", category: "network", subcategory: "routing", tags: ["OSPF"],
    question: "OSPFのルータの役割に関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "AS境界ルータ(ASBR)は、OSPFドメイン外部のルーティングプロトコルから得た経路情報をOSPF内に再配布する。",
      "イ": "バックボーンルータは、エリア0以外のスタブエリアにのみ配置されるルータである。",
      "ウ": "DR(代表ルータ)は、ポイントツーポイント接続のネットワークにおいてのみ選出される。",
      "エ": "エリア境界ルータ(ABR)は、単一のエリア内でのみLSAの送受信を行う。"
    },
    answer: "ア",
    explanation: "ASBR(Autonomous System Boundary Router: AS境界ルータ)は、BGPやスタティックルーティングなど外部の経路情報をOSPFのAS内に再配布(Redistribute)するルータです。イは誤りでバックボーンルータはエリア0に属します。ウは誤りでDRはブロードキャスト型やNBMA型ネットワークで選出されます。エは誤りでABRは複数エリア間の境界に位置し、LSAの集約や変換を行います。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 1 },
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 3 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 2 }
    ]
  },
  {
    masterId: "M-ROUT-02", category: "network", subcategory: "routing", tags: ["OSPF", "LSA"],
    question: "OSPFにおいて、エリア境界ルータ(ABR)が他のエリアへネットワーク情報を伝播するために生成するLSAタイプはどれか。",
    choices: {
      "ア": "タイプ1 (ルータLSA)",
      "イ": "タイプ2 (ネットワークLSA)",
      "ウ": "タイプ3 (サマリーLSA)",
      "エ": "タイプ5 (AS外部リンクLSA)"
    },
    answer: "ウ",
    explanation: "タイプ3 LSA(サマリーLSAまたはネットワークサマリーLSA)は、ABRによって生成され、あるエリアのネットワーク情報を他のエリアへ通知するために使用されます。タイプ1は各ルータがエリア内に生成、タイプ2はDRが生成、タイプ5はASBRが外部経路を通知するために生成します。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 2 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 4 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 3 }
    ]
  },
  {
    masterId: "M-ROUT-03", category: "network", subcategory: "routing", tags: ["BGP"],
    question: "BGP-4におけるパスアトリビュートに関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "AS_PATHは経路が通過してきたAS番号のリストであり、受信した経路に自AS番号が含まれる場合はループとみなして破棄する。",
      "イ": "NEXT_HOPアトリビュートは、パケットを受信するホストのMACアドレスを保持する。",
      "ウ": "LOCAL_PREFは、外部ASのルータに対して自ASへの優先進入経路を指示するために通知される。",
      "エ": "MED(MULTI_EXIT_DISC)は、自AS内のIBGPピア間で優先経路を決定するためにのみ使用され、AS外へは送信されない。"
    },
    answer: "ア",
    explanation: "BGP-4のAS_PATH属性は通過したASのリストであり、自AS番号が含まれている経路を受信したときはルーティングループを検出して破棄します。ウはMED、エはLOCAL_PREFの説明（LOCAL_PREFは自AS内のみで有効、MEDは外部ASへ通知して進入ルートを指定）です。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 3 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 5 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 1 }
    ]
  },
  {
    masterId: "M-ROUT-04", category: "network", subcategory: "routing", tags: ["BGP", "IBGP"],
    question: "IBGP(Internal BGP)のフルメッシュ接続の課題を解決するために用いられる技術として、適切なものはどれか。",
    choices: {
      "ア": "ルートリフレクタ",
      "イ": "RIPスプリットホライズン",
      "ウ": "プロキシARP",
      "エ": "VRRP"
    },
    answer: "ア",
    explanation: "IBGPではループ防止のため受信した経路を他のIBGPピアに再広告しない規則があるため、ルータ数が増えるとフルメッシュ接続が必要になります。これを緩和・解決する技術が「ルートリフレクタ(Route Reflector)」および「コンフェデレーション(Confederation)」です。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 4 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 2 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 4 }
    ]
  },
  {
    masterId: "M-ROUT-05", category: "network", subcategory: "routing", tags: ["RIP"],
    question: "RIP (Routing Information Protocol) において、到達不能を示すメトリック（ホップ数）の値はどれか。",
    choices: {
      "ア": "15",
      "イ": "16",
      "ウ": "255",
      "エ": "65535"
    },
    answer: "イ",
    explanation: "RIPでは有効なホップ数の最大値は15であり、「16」は到達不能(無限大)を表します。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 3 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 2 },
      { year: "R1",  yearLabel: "令和元年", yearNum: 2019, num: 3 }
    ]
  },
  {
    masterId: "M-ROUT-06", category: "network", subcategory: "routing", tags: ["ルート制御"],
    question: "ディスタンスベクタ型ルーティングプロトコルにおいて、ルーティングループを抑制するための仕組みである「スプリットホライズン」の説明として、適切なものはどれか。",
    choices: {
      "ア": "あるインタフェースから受信した経路情報を、同じインタフェースから送出しない。",
      "イ": "障害を検知した経路のメトリックを即座に最大値(無限大)に設定して広告する。",
      "ウ": "一定時間更新情報が受信されない経路を直ちにルーティングテーブルから削除する。",
      "エ": "定期的なアップデート間隔をランダムにずらすことでパケットの衝突を防ぐ。"
    },
    answer: "ア",
    explanation: "スプリットホライズン(Split Horizon)は、ある経路情報を学習したインタフェースからは、その経路情報を逆方向に送り返さないことで、隣接ルータ間での単純なルーティングループを防ぐ仕組みです。イはポイズンリバース(Poison Reverse)の説明です。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 4 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 1 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 1 }
    ]
  },

  // ===== スイッチング =====
  {
    masterId: "M-SW-01", category: "network", subcategory: "switching", tags: ["IEEE 802.1Q", "VLAN"],
    question: "IEEE 802.1Qで規定されているVLANタグのサイズは何バイトか。",
    choices: {
      "ア": "2バイト",
      "イ": "4バイト",
      "ウ": "6バイト",
      "エ": "8バイト"
    },
    answer: "イ",
    explanation: "IEEE 802.1QのVLANタグは4バイトです。内訳はTPID (Tag Protocol Identifier: 0x8100固定) 2バイトと、TCI (Tag Control Information: 優先度3bit、CFI 1bit、VLAN ID 12bit) 2バイトです。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 1 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 3 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 2 },
      { year: "R6",  yearLabel: "令和6年",  yearNum: 2024, num: 1 }
    ]
  },
  {
    masterId: "M-SW-02", category: "network", subcategory: "switching", tags: ["STP"],
    question: "スパニングツリープロトコル(IEEE 802.1D STP)において、ルートブリッジを選出するための基準として適切なものはどれか。",
    choices: {
      "ア": "ブリッジID(プライオリティ値 + MACアドレス)の値が最も小さいブリッジ",
      "イ": "ブリッジIDの値が最も大きいブリッジ",
      "ウ": "接続ポート数が最も多いブリッジ",
      "エ": "IPアドレスの値が最も小さいブリッジ"
    },
    answer: "ア",
    explanation: "STPでは各ブリッジがBPDUを交換し、ブリッジプライオリティ(2バイト)とMACアドレス(6バイト)で構成される「ブリッジID」の数値が最も小さいものがルートブリッジに選出されます。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 2 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 3 },
      { year: "R1",  yearLabel: "令和元年", yearNum: 2019, num: 1 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 4 }
    ]
  },
  {
    masterId: "M-SW-03", category: "network", subcategory: "switching", tags: ["RSTP"],
    question: "RSTP (Rapid Spanning Tree Protocol, IEEE 802.1w) に関する記述として、適切なものはどれか。",
    choices: {
      "ア": "プロポーザル/アグリーメント機構を採用し、トポロジ変更時の収束時間を大幅に短縮している。",
      "イ": "ポートの状態遷移として、Blocking, Listening, Learning, Forwarding の4状態をそのまま維持している。",
      "ウ": "各VLANごとに独立したスパニングツリーインスタンスを自動生成する規格である。",
      "エ": "BPDUの送受信を行わず、キープアライブパケットのみでループを検出する。"
    },
    answer: "ア",
    explanation: "RSTP(IEEE 802.1w)は、従来のSTPの収束時間(約30〜50秒)をミリ秒〜数秒レベルへ劇的に短縮したプロトコルです。ハンドシェイク機構(Proposal/Agreement)により即座にフォワーディング状態へ遷移します。ポート状態はDiscarding, Learning, Forwardingの3状態に整理されました。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 2 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 1 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 3 }
    ]
  },
  {
    masterId: "M-SW-04", category: "network", subcategory: "switching", tags: ["リンクアグリゲーション"],
    question: "リンクアグリゲーション(IEEE 802.3ad / IEEE 802.1AX)の動作および利点として、適切なものはどれか。",
    choices: {
      "ア": "複数の物理回線を論理的に1本の広帯域回線として束ね、帯域拡大と回線障害時の冗長化を同時に実現する。",
      "イ": "ブロードキャストフレームのループを検知して自動的に該当ポートを論理遮断する。",
      "ウ": "送信パケットをフレーム単位で完全に均等にラウンドロビン配信することでパケット到達順序を保証する。",
      "エ": "異なる通信速度（1Gbpsと100Mbpsなど）のポートをそのまま混在させて束ねることができる。"
    },
    answer: "ア",
    explanation: "リンクアグリゲーション(LAG)は、複数の物理ポートを1つの論理ポートとして束ね、合計帯域幅の増加と耐障害性(1本断線しても通信継続)を提供します。パケット順序逆転を防ぐため通常はMACやIPのハッシュ値に基づき特定フローは同一物理回線を通します。異なる速度の混在は不可です。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 2 },
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 4 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 3 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 4 }
    ]
  },

  // ===== IP & アドレッシング =====
  {
    masterId: "M-IP-01", category: "network", subcategory: "ip", tags: ["サブネット計算", "CIDR"],
    question: "IPアドレス 192.168.10.140、サブネットマスク 255.255.255.224 のホストが属するサブネットのブロードキャストアドレスはどれか。",
    choices: {
      "ア": "192.168.10.143",
      "イ": "192.168.10.159",
      "ウ": "192.168.10.191",
      "エ": "192.168.10.255"
    },
    answer: "イ",
    explanation: "サブネットマスク 255.255.255.224 は /27 です。第4オクテットのホスト部は5ビット、サブネットのブロックサイズは 32 です(256 - 224 = 32)。サブネットの範囲は 0-31, 32-63, 64-95, 96-127, 128-159... となります。140 が属するのは 128〜159 のサブネットであり、ネットワークアドレスは 192.168.10.128、ブロードキャストアドレスは末尾の 192.168.10.159 です。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 5 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 2 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 2 }
    ]
  },
  {
    masterId: "M-IP-02", category: "network", subcategory: "ip", tags: ["IPv6"],
    question: "IPv6の基本ヘッダに関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "ヘッダ長は40バイトの固定長であり、IPv4にあったヘッダチェックサムやオプション領域が基本ヘッダから削除されている。",
      "イ": "ヘッダ長は可変長であり、IHLフィールドでヘッダ長を指定する。",
      "ウ": "IPv6基本ヘッダ内に暗号化ペイロード情報(ESP)が必ず含まれる。",
      "エ": "ルータでのパケット転送を高速化するため、各ルータがホップごとに基本ヘッダのチェックサムを再計算する。"
    },
    answer: "ア",
    explanation: "IPv6基本ヘッダはルータの処理効率化のため40バイト固定長になっています。IPv4ヘッダにあったチェックサム(L2やL4で十分担保されるため)やオプションは基本ヘッダから削除され、必要な機能は拡張ヘッダとして次ヘッダ(Next Header)で連鎖します。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 2 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 4 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 2 }
    ]
  },
  {
    masterId: "M-IP-03", category: "network", subcategory: "ip", tags: ["IPv6", "スコープ"],
    question: "IPv6において、同一リンク上のノード間でのみ通信が可能な「リンクローカルアドレス」のプレフィックスはどれか。",
    choices: {
      "ア": "fe80::/10",
      "イ": "fc00::/7",
      "ウ": "ff00::/8",
      "エ": "2001::/16"
    },
    answer: "ア",
    explanation: "fe80::/10 はリンクローカルユニキャストアドレスです。fc00::/7 はユニークローカルアドレス(ULA: IPv4のプライベートIPに相当)、ff00::/8 はマルチキャストアドレス、2001:: などはグローバルユニキャストアドレスです。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 4 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 2 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 1 }
    ]
  },
  {
    masterId: "M-IP-04", category: "network", subcategory: "ip", tags: ["NAT", "NAPT"],
    question: "NAPT(Network Address Port Translation)に関する記述として、適切なものはどれか。",
    choices: {
      "ア": "プライベートIPアドレスとグローバルIPアドレスに加えて、TCP/UDPのポート番号も変換することで、単一のグローバルIPアドレスを多数のホストで共有可能にする。",
      "イ": "IPアドレスの変換のみを行い、ポート番号の変換は行わないため、同時に通信可能な端末数はグローバルIPの個数に一致する。",
      "ウ": "MACアドレスをIPアドレスに動的に割り当てる技術である。",
      "エ": "IPsec通信を行う際、パケットのESPペイロードをポート番号を含めて透過的に変換できるため相性が良い。"
    },
    answer: "ア",
    explanation: "NAPT(IPマスカレード)はIPアドレスとトランスポート層ポート番号の両方を動的に変換・マッピングすることで、1つのグローバルIPアドレスを多数の内部クライアントで共有できます。なお、IPsecではESP暗号化によりポート番号が見えなくなるため、NAT越えにはNAT-Traversal (UDP 4500)が必要です。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 5 },
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 5 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 2 },
      { year: "R6",  yearLabel: "令和6年",  yearNum: 2024, num: 2 }
    ]
  },

  // ===== TCP & UDP =====
  {
    masterId: "M-TCP-01", category: "network", subcategory: "tcp_udp", tags: ["TCP制御"],
    question: "TCPのスリーウェイハンドシェイクにおいて、クライアントAとサーバBのパケット送受信シーケンスとして正しいものはどれか。",
    choices: {
      "ア": "A→B: SYN, B→A: SYN+ACK, A→B: ACK",
      "イ": "A→B: SYN, B→A: ACK, A→B: SYN+ACK",
      "ウ": "A→B: SYN+ACK, B→A: SYN, A→B: ACK",
      "エ": "A→B: ACK, B→A: SYN+ACK, A→B: SYN"
    },
    answer: "ア",
    explanation: "TCPコネクションの確立は、1. クライアントからSYN送信、2. サーバからSYN+ACK返信、3. クライアントからACK送信という3ステップ(スリーウェイハンドシェイク)で行われます。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 3 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 4 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 4 }
    ]
  },
  {
    masterId: "M-TCP-02", category: "network", subcategory: "tcp_udp", tags: ["輻輳制御"],
    question: "TCPの輻輳制御において、コネクション開始直後やパケット損失後の回復時に、輻輳ウィンドウサイズを1から指数関数的（ACKを受信するごとに倍増）に増加させるアルゴリズムはどれか。",
    choices: {
      "ア": "スロースタート",
      "イ": "輻輳回避",
      "ウ": "高速再送",
      "エ": "フロー制御"
    },
    answer: "ア",
    explanation: "「スロースタート」は、初期の輻輳ウィンドウ(CWND)を小さく設定し、ACKを受信するたびにCWNDを指数関数的に増加させ、ネットワークの利用可能な帯域を素早く探るアルゴリズムです。閾値(ssthresh)に達した後は「輻輳回避」(線形増加)に移行します。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 4 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 4 },
      { year: "R1",  yearLabel: "令和元年", yearNum: 2019, num: 4 }
    ]
  },
  {
    masterId: "M-TCP-03", category: "network", subcategory: "tcp_udp", tags: ["UDP", "ヘッダ"],
    question: "UDPヘッダに含まれるフィールドの組み合わせとして、適切なものはどれか。",
    choices: {
      "ア": "送信元ポート番号、宛先ポート番号、UDP長さ、チェックサム",
      "イ": "送信元ポート番号、宛先ポート番号、シーケンス番号、ACK番号",
      "ウ": "送信元IPアドレス、宛先IPアドレス、UDP長さ、チェックサム",
      "エ": "送信元ポート番号、宛先ポート番号、ウィンドウサイズ、緊急ポインタ"
    },
    answer: "ア",
    explanation: "UDPヘッダはわずか8バイト固定長で、1. 送信元ポート番号(2B)、2. 宛先ポート番号(2B)、3. UDP長さ(2B)、4. チェックサム(2B) の4つのフィールドのみで構成されています。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 5 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 5 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 3 }
    ]
  },

  // ===== DNS =====
  {
    masterId: "M-DNS-01", category: "network", subcategory: "dns", tags: ["DNSレコード"],
    question: "DNSのリソースレコードのうち、ドメイン宛ての電子メールを配送すべきメールサーバ（MTA）のホスト名を指定するレコードはどれか。",
    choices: {
      "ア": "Aレコード",
      "イ": "CNAMEレコード",
      "ウ": "MXレコード",
      "エ": "PTRレコード"
    },
    answer: "ウ",
    explanation: "MX (Mail eXchanger) レコードは、ドメイン宛てメールの配送先サーバホスト名と優先順位(Preference)を定義します。AはIPv4アドレス、CNAMEは別名、PTRは逆引き(IP→FQDN)です。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 1 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 5 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 5 }
    ]
  },
  {
    masterId: "M-DNS-02", category: "network", subcategory: "dns", tags: ["DNSSEC"],
    question: "DNSSEC (DNS Security Extensions) が提供するセキュリティ機能として、適切なものはどれか。",
    choices: {
      "ア": "公開鍵暗号とデジタル署名を用いて、DNS応答データが改ざんされていないこと(完全性)と正当な権威サーバからのものであること(真正性)を検証可能にする。",
      "イ": "DNSクライアントとフルリゾルバ間の通信全体を共通鍵暗号方式で暗号化して盗聴を防ぐ。",
      "ウ": "権威DNSサーバへのDDoS攻撃を検知し、自動的に不要なパケットを遮断する。",
      "エ": "ゾーン転送時にTLSハンドシェイクを用いて通信相手のサーバ証明書を検証する。"
    },
    answer: "ア",
    explanation: "DNSSECは、DNSゾーンのレコードにデジタル署名(RRSIG)を付加し、DNSKEYや上位ゾーンのDSレコードと信頼の連鎖を形成することで、キャッシュサーバ側で応答データの偽造や改ざん(キャッシュポイズニング)を検知・防御する技術です。通信の暗号化(盗聴防止)を行うのはDoH/DoTです。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 1 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 6 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 5 }
    ]
  },
  {
    masterId: "M-DNS-03", category: "network", subcategory: "dns", tags: ["キャッシュポイズニング"],
    question: "DNSキャッシュポイズニング攻撃（カミンスキーアタック等）に対する防御策として、最も効果的なものはどれか。",
    choices: {
      "ア": "フルサービスリゾルバが外部DNSサーバへ問い合わせを行う際の「送信元ポート番号」をランダム化(ソースポートランダマイゼーション)する。",
      "イ": "DNSサーバのIPアドレスを動的に変更する。",
      "ウ": "キャッシュの有効期間(TTL)をできるだけ長く設定して問い合わせ頻度を下げる。",
      "エ": "再帰的問い合わせをインターネット全体から無制限に受け付けるようオープンリゾルバ化する。"
    },
    answer: "ア",
    explanation: "DNSキャッシュポイズニングは偽のDNS応答を本物より先に送り込んでキャッシュを汚染する攻撃です。攻撃者が正解パケットを偽造するにはトランザクションID(16bit)と送信元ポート(16bit)を推測する必要があるため、ポート番号をランダム化(ソースポートランダマイゼーション)することで推測難易度を跳ね上げることができます。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 1 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 3 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 3 }
    ]
  },

  // ===== HTTP & WEB =====
  {
    masterId: "M-HTTP-01", category: "network", subcategory: "http", tags: ["HTTP/2"],
    question: "HTTP/2に関する記述として、適切なものはどれか。",
    choices: {
      "ア": "単一のTCPコネクション上で複数のリクエストとレスポンスをバイナリフレームとして多重化(マルチプレキシング)できる。",
      "イ": "トランスポート層プロトコルとしてUDPを使用し、暗号化が必須化されている。",
      "ウ": "テキストベースのプロトコルであり、CookieやHTTPヘッダは一切圧縮されない。",
      "エ": "セッション確立ごとに毎回個別のTCPコネクションを開放・再接続する。"
    },
    answer: "ア",
    explanation: "HTTP/2は1つのTCPコネクション上で複数のストリームを多重化し、パイプライニングの課題(Head-of-Line Blocking)を解決しました。またバイナリフレーム化とHPACKによるヘッダ圧縮を備えています。UDPを使用するのはHTTP/3です。",
    appearances: [
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 6 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 5 },
      { year: "R6",  yearLabel: "令和6年",  yearNum: 2024, num: 3 }
    ]
  },
  {
    masterId: "M-HTTP-02", category: "network", subcategory: "http", tags: ["Cookie", "セキュリティ"],
    question: "Webアプリケーションにおいて、セッションIDを保持するCookieに設定すべき属性とその効果の組み合わせとして、適切なものはどれか。",
    choices: {
      "ア": "HttpOnly属性を指定すると、ブラウザ上のJavaScript(XSS等)から該当Cookieへのアクセスを遮断できる。",
      "イ": "Secure属性を指定すると、HTTPとHTTPSの両方の通信でCookieが暗号化されて送信される。",
      "ウ": "SameSite属性にStrictを指定すると、同一IPアドレスからのアクセスのみCookieが許可される。",
      "エ": "Domain属性に自ドメインの上位TLD(.jpなど)を指定すると全サブドメインで安全に共有できる。"
    },
    answer: "ア",
    explanation: "HttpOnly属性は、document.cookieなどのJavaScriptからのアクセスを禁止し、XSS攻撃によるセッションID奪取を防止します。Secure属性はHTTPS通信時のみ送信を許可する属性です。SameSiteはクロスサイトリクエスト時の送信制限(CSRF対策)です。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 6 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 6 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 5 }
    ]
  },

  // ===== 電子メール =====
  {
    masterId: "M-MAIL-01", category: "network", subcategory: "email", tags: ["送信ドメイン認証", "DKIM"],
    question: "電子メールの送信ドメイン認証技術であるDKIM(DomainKeys Identified Mail)の動作原理として、適切なものはどれか。",
    choices: {
      "ア": "送信側メールサーバがメールヘッダや本文に秘密鍵でデジタル署名を付加し、受信側が送信元ドメインのDNSから公開鍵を取得して署名を検証する。",
      "イ": "受信側メールサーバが、送信元IPアドレスと送信元ドメインのDNS TXTレコード(SPF)に記載された許可IPを照合する。",
      "ウ": "認証に失敗したメールの処置(none, quarantine, reject)を送信元管理者が宣言し、認証結果のレポートを受信する。",
      "エ": "送信側SMTPサーバと受信側SMTPサーバ間の通信経路をTLSで暗号化する。"
    },
    answer: "ア",
    explanation: "DKIMはメールに電子署名を付与し、受信側が送信ドメインのDNSから取得した公開鍵で検証することで、なりすましとメール改ざんを検知します。イはSPF、ウはDMARC、エはSTARTTLSの説明です。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 3 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 4 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 6 }
    ]
  },
  {
    masterId: "M-MAIL-02", category: "network", subcategory: "email", tags: ["IMAP", "POP3"],
    question: "メール受信プロトコルであるIMAP4の特徴として、POP3と比較した記述のうち適切なものはどれか。",
    choices: {
      "ア": "メールボックスをサーバ上で管理するため、複数の端末から未読・既読状態やフォルダ構成を同期して利用できる。",
      "イ": "メール受信時に必ずすべてのメッセージ本文をローカル端末にダウンロードしてサーバから消去する。",
      "ウ": "通信経路上での認証データや本文の暗号化機能が標準で必須化されている。",
      "エ": "クライアントからメールを外部へ送信・中継するためのプロトコルである。"
    },
    answer: "ア",
    explanation: "IMAP4はメールをサーバ上で一元管理するため、PCやスマートフォンなど複数端末間で未読・既読・フラグ・フォルダの同期が容易です。本文をダウンロードせずヘッダのみを取得することも可能です。イはPOP3の典型的な動作です。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 5 },
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 5 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 1 }
    ]
  },

  // ===== セキュリティ =====
  {
    masterId: "M-SEC-01", category: "security", subcategory: "security", tags: ["IPsec"],
    question: "IPsecにおいて、パケットの暗号化による機密性および改ざん検知による完全性を同時に提供するプロトコルはどれか。",
    choices: {
      "ア": "AH (Authentication Header)",
      "イ": "ESP (Encapsulating Security Payload)",
      "ウ": "IKE (Internet Key Exchange)",
      "エ": "L2TP (Layer 2 Tunneling Protocol)"
    },
    answer: "イ",
    explanation: "ESPはデータの暗号化(機密性)と認証・改ざん検知(完全性)の両方を提供します。AHは認証と完全性のみを提供し、暗号化は行いません。IKEは共通鍵やセキュリティアソシエーション(SA)の自動交換プロトコルです。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 6 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 7 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 6 }
    ]
  },
  {
    masterId: "M-SEC-02", category: "security", subcategory: "security", tags: ["TLS 1.3"],
    question: "TLS 1.3における主な変更点および特徴として、適切なものはどれか。",
    choices: {
      "ア": "ハンドシェイクが最適化され、初回接続が1-RTTで完了し、さらに再接続時には0-RTT (Early Data) による通信開始が可能になった。",
      "イ": "後方互換性のため、RC4、3DES、静的RSA鍵交換などのレガシー暗号スイートが標準で保持されている。",
      "ウ": "共通鍵暗号としてCBCモードのみが採用され、GCMやCCMなどのAEAD暗号は廃止された。",
      "エ": "通信データの完全性検証を行わず、暗号化のみを行うことで高速化を図っている。"
    },
    answer: "ア",
    explanation: "TLS 1.3ではハンドシェイクが2-RTTから1-RTTへ短縮され、0-RTTモードも導入されました。また、前方秘匿性(PFS)を持たない静的RSA鍵交換や脆弱な暗号(RC4, 3DES, CBCモード)が全廃され、認証付き暗号(AEAD)のみが許可されています。",
    appearances: [
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 6 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 7 },
      { year: "R6",  yearLabel: "令和6年",  yearNum: 2024, num: 4 }
    ]
  },
  {
    masterId: "M-SEC-03", category: "security", subcategory: "security", tags: ["IEEE 802.1X", "RADIUS"],
    question: "IEEE 802.1X認証システムを構成する3つのエンティティとして、正しい組み合わせはどれか。",
    choices: {
      "ア": "サプリカント (端末)、オーセンティケータ (スイッチ/AP)、認証サーバ (RADIUS等)",
      "イ": "クライアント、CA(認証局)、DNSサーバ",
      "ウ": "プロキシサーバ、マスターブラウザ、LDAPサーバ",
      "エ": "KDC(鍵配布センタ)、チケットサーバ、クライアント"
    },
    answer: "ア",
    explanation: "IEEE 802.1X認証は、1. サプリカント(クライアント端末)、2. オーセンティケータ(認証スイッチや無線アクセスポイント)、3. 認証サーバ(RADIUSサーバ)の3要素で構成されます。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 6 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 7 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 6 }
    ]
  },

  // ===== 無線LAN =====
  {
    masterId: "M-WLAN-01", category: "network", subcategory: "wireless", tags: ["WPA2", "WPA3"],
    question: "無線LANのセキュリティ規格WPA3-Personalにおいて、従来のWPA2-PSKで脆弱であった事前共有鍵に対する総当たり攻撃や辞書攻撃を防ぐために導入された鍵交換プロトコルはどれか。",
    choices: {
      "ア": "SAE (Simultaneous Authentication of Equals)",
      "イ": "WEP (Wired Equivalent Privacy)",
      "ウ": "TKIP (Temporal Key Integrity Protocol)",
      "エ": "WPS (Wi-Fi Protected Setup)"
    },
    answer: "ア",
    explanation: "WPA3-Personalでは、ディフィー・ヘルマン鍵共有をベースにしたSAE(Simultaneous Authentication of Equals: 同等性同時認証)が導入されました。これにより、パスワードが単純であってもオフライン辞書攻撃を受けず、前方秘匿性が確保されます。",
    appearances: [
      { year: "R1",  yearLabel: "令和元年", yearNum: 2019, num: 5 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 7 },
      { year: "R6",  yearLabel: "令和6年",  yearNum: 2024, num: 5 }
    ]
  },
  {
    masterId: "M-WLAN-02", category: "network", subcategory: "wireless", tags: ["IEEE 802.11ax", "Wi-Fi 6"],
    question: "Wi-Fi 6 (IEEE 802.11ax) で採用され、通信帯域を複数のサブキャリア（リソースユニット）に分割して複数端末と同時に送受信を行う技術はどれか。",
    choices: {
      "ア": "OFDMA (直交周波数分割多元接続)",
      "イ": "CSMA/CD (搬送波感知多重アクセス/衝突検出)",
      "ウ": "チャネルボンディング",
      "エ": "DSSS (直接拡散スペクトラム拡散)"
    },
    answer: "ア",
    explanation: "Wi-Fi 6で導入されたOFDMA(Orthogonal Frequency Division Multiple Access)は、1つの通信チャネルを微小な周波数ブロック(リソースユニット)に細分化し、複数の端末宛ての通信を同時に相乗りさせることで、混雑環境での遅延とスループットを大幅に改善します。",
    appearances: [
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 7 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 8 }
    ]
  },

  // ===== 高可用性 & QOS =====
  {
    masterId: "M-QOS-01", category: "network", subcategory: "qos", tags: ["VRRP"],
    question: "VRRP(Virtual Router Redundancy Protocol, RFC 5798)において、マスタールータの障害発生をバックアップルータが検知するメカニズムとして適切なものはどれか。",
    choices: {
      "ア": "マスタールータからマルチキャストで定期送信されるVRRPアドバタイズメントパケットが一定期間途絶える。",
      "イ": "バックアップルータからマスタールータへのICMP Echo応答が途絶える。",
      "ウ": "デフォルトゲートウェイのMACアドレスに対するARP要求に無応答になる。",
      "エ": "OSPFなどのダイナミックルーティングのネイバー関係が切断される。"
    },
    answer: "ア",
    explanation: "VRRPではマスタールータが一定間隔(デフォルト1秒)でVRRPアドバタイズメントをマルチキャスト(224.0.0.18)送信します。バックアップルータが3回分など一定期間受信しなかった場合、マスターのダウンと判定して昇格処理を行います。",
    appearances: [
      { year: "H22", yearLabel: "平成22年", yearNum: 2010, num: 7 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 7 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 7 }
    ]
  },
  {
    masterId: "M-QOS-02", category: "network", subcategory: "qos", tags: ["QoS", "DiffServ"],
    question: "IPネットワークのQoS制御方式であるDiffServ(Differentiated Services)の説明として、適切なものはどれか。",
    choices: {
      "ア": "IPパケットのDSCP(DiffServ Code Point)フィールドの値に基づき、各ルータが事前に定義された優先度(PHB)に従ってパケットを振り分けて転送する。",
      "イ": "通信に先立ち、RSVPプロトコルを用いてエンドツーエンドの通信経路上の全ルータで帯域を事前予約する。",
      "ウ": "パケットのTCPポート番号のみを監視して、Webトラフィックのみを無制限に優先する。",
      "エ": "送信元ホストが自身の回線利用率に応じて送信パケットに動的に暗号化タグを付与する。"
    },
    answer: "ア",
    explanation: "DiffServは、IPヘッダ内のToS/トラフィッククラスフィールドの6ビット(DSCP)を用いてパケットをクラス分けし、各ルータがそのクラスに応じた振る舞い(PHB: Per-Hop Behavior)で優先制御・帯域制御を行うスケーラブルなQoS方式です。イはIntServ/RSVPの説明です。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 7 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 8 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 8 }
    ]
  },

  // ===== SDN & 仮想化 =====
  {
    masterId: "M-SDN-01", category: "network", subcategory: "sdn", tags: ["OpenFlow", "SDN"],
    question: "OpenFlowにおいて、スイッチがパケットを受信した際に転送先や処理方法を決定するために参照するテーブルはどれか。",
    choices: {
      "ア": "フローテーブル",
      "イ": "FIB (Forwarding Information Base)",
      "ウ": "ARPキャッシュテーブル",
      "エ": "CAMテーブル"
    },
    answer: "ア",
    explanation: "OpenFlowスイッチは「フローテーブル」を保持し、コントローラから注入されたフローエントリ（マッチ条件、カウンタ、アクション）に基づいてパケットの転送、書き換え、破棄などを実行します。",
    appearances: [
      { year: "H26", yearLabel: "平成26年", yearNum: 2014, num: 6 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 5 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 9 }
    ]
  },
  {
    masterId: "M-SDN-02", category: "network", subcategory: "sdn", tags: ["VXLAN"],
    question: "データセンターなどのネットワーク仮想化で用いられるVXLAN (Virtual eXtensible Local Area Network) の特徴として、適切なものはどれか。",
    choices: {
      "ア": "イーサネットフレームをUDPパケットでカプセル化し、24ビットのVNI(VXLAN Network Identifier)により約1600万個の論理ネットワークを識別できる。",
      "イ": "IEEE 802.1Qタグを2重に重ねることで4096×4096個のVLANを作成するL2技術である。",
      "ウ": "MPLSヘッダをIPパケットの末尾に追加してハードウェアスイッチのみで高速中継する。",
      "エ": "TCPセッションを暗号化してトンネリングするためのSSL-VPN技術の一種である。"
    },
    answer: "ア",
    explanation: "VXLAN(RFC 7348)はL2 over L3トンネリング技術で、EthernetフレームをUDP(宛先ポート4789)でカプセル化します。24bitのVNIにより、VLANの上限(4094個)を大きく超える最大約1677万個の論理セグメントを構築できます。",
    appearances: [
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 8 },
      { year: "R1",  yearLabel: "令和元年", yearNum: 2019, num: 6 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 9 }
    ]
  },

  // ===== ネットワーク管理 =====
  {
    masterId: "M-MGMT-01", category: "network", subcategory: "management", tags: ["SNMPv3"],
    question: "SNMPv3で導入され、SNMPv1やSNMPv2cと比較して最も大きく強化された機能はどれか。",
    choices: {
      "ア": "USM (User-based Security Model) によるユーザ認証と通信メッセージの暗号化",
      "イ": "マネージャからエージェントへのTrapパケット送信機能",
      "ウ": "TCPポート161番を使用したストリーム通信サポート",
      "エ": "MIB定義をXML形式で記述するスキーマ機能"
    },
    answer: "ア",
    explanation: "SNMPv1/v2cでは平文のコミュニティ名による簡易認証しかありませんでしたが、SNMPv3ではUSMによるユーザ認証(HMAC-MD5/SHA)と暗号化(DES/AES)が実装され、安全なネットワーク監視が可能になりました。",
    appearances: [
      { year: "H24", yearLabel: "平成24年", yearNum: 2012, num: 8 },
      { year: "H29", yearLabel: "平成29年", yearNum: 2017, num: 9 },
      { year: "R5",  yearLabel: "令和5年",  yearNum: 2023, num: 10 }
    ]
  },
  {
    masterId: "M-MGMT-02", category: "network", subcategory: "management", tags: ["syslog"],
    question: "syslogプロトコル(RFC 5424)において、メッセージの重大度を表すSeverity（セビリティ）の値として、最も重要度・緊急度が高いものはどれか。",
    choices: {
      "ア": "0 (Emergency: システムが使用不能)",
      "イ": "1 (Alert: 直ちに対処が必要)",
      "ウ": "4 (Warning: 警告)",
      "エ": "7 (Debug: デバッグレベル)"
    },
    answer: "ア",
    explanation: "syslogのSeverityは 0〜7 で定義され、数値が小さいほど緊急度が高くなります。0はEmergency(システム使用不可)、7はDebugです。",
    appearances: [
      { year: "H25", yearLabel: "平成25年", yearNum: 2013, num: 6 },
      { year: "H30", yearLabel: "平成30年", yearNum: 2018, num: 6 },
      { year: "R3",  yearLabel: "令和3年",  yearNum: 2021, num: 8 }
    ]
  },
  {
    masterId: "M-MGMT-03", category: "network", subcategory: "management", tags: ["NTP"],
    question: "NTP (Network Time Protocol) において、時計の階層構造（信頼度）を表す用語はどれか。",
    choices: {
      "ア": "Stratum (ストラタム)",
      "イ": "Metric (メトリック)",
      "ウ": "Hop Count (ホップカウント)",
      "エ": "Jitter (ジッター)"
    },
    answer: "ア",
    explanation: "NTPでは時間の正確度・階層を「Stratum(ストラタム)」で表します。原子時計やGPSに直結した最上位サーバがStratum 1、それから時刻同期するサーバがStratum 2、と順に数値が大きくなります(最大15)。",
    appearances: [
      { year: "H23", yearLabel: "平成23年", yearNum: 2011, num: 7 },
      { year: "H28", yearLabel: "平成28年", yearNum: 2016, num: 9 },
      { year: "R4",  yearLabel: "令和4年",  yearNum: 2022, num: 10 }
    ]
  },

  // ===== システム & 信頼性 =====
  {
    masterId: "M-SYS-01", category: "other", subcategory: "other", tags: ["信頼性計算"],
    question: "稼働率がRの装置2台を並列に接続し、どちらか一方でも稼働していればシステム全体が稼働する並列システムの稼働率を表す式はどれか。",
    choices: {
      "ア": "1 - (1 - R)^2",
      "イ": "R^2",
      "ウ": "2R - R^2",
      "エ": "アとウの両方"
    },
    answer: "エ",
    explanation: "並列システムの稼働率は「1 - 両方停止する確率」なので 1 - (1 - R)^2 です。これを展開すると 1 - (1 - 2R + R^2) = 2R - R^2 となり、式としてアとウは同値です。",
    appearances: [
      { year: "H21", yearLabel: "平成21年", yearNum: 2009, num: 6 },
      { year: "H27", yearLabel: "平成27年", yearNum: 2015, num: 8 },
      { year: "R2",  yearLabel: "令和2年",  yearNum: 2020, num: 8 },
      { year: "R6",  yearLabel: "令和6年",  yearNum: 2024, num: 6 }
    ]
  },

  // ===== 令和8年度 CBT最新予想問題 =====
  {
    masterId: "PRED-01", category: "network", subcategory: "http", tags: ["HTTP/3", "QUIC"],
    question: "【令和8年度 予想】HTTP/3において、トランスポート層プロトコルとして採用されているものはどれか。",
    choices: {
      "ア": "QUIC (UDPベース)",
      "イ": "TCP (TLS 1.3統合)",
      "ウ": "SCTP",
      "エ": "DCCP"
    },
    answer: "ア",
    explanation: "HTTP/3では、TCPに起因するパケットロス時のHead-of-Line Blocking問題を根本的に解決するため、UDP上で動作する「QUIC」プロトコルを採用しています。QUIC自身にTLS 1.3相当の暗号化や輻輳制御が組み込まれています。",
    appearances: [
      { year: "R7", yearLabel: "令和7年(予想)", yearNum: 2025, num: 1 }
    ]
  },
  {
    masterId: "PRED-02", category: "security", subcategory: "security", tags: ["ゼロトラスト", "ZTNA"],
    question: "【令和8年度 予想】従来の境界防御モデルに対する「ゼロトラスト(Zero Trust)」アーキテクチャの基本理念として、最も適切なものはどれか。",
    choices: {
      "ア": "社内ネットワークを含めすべての通信トラフィックを信頼できないものとし、アクセスごとにユーザ、端末の健全性、コンテキストを動的に検証・認可する。",
      "イ": "社内LANと外部インターネットの境界に次世代ファイアウォールを配置し、境界内部の通信は無条件に信頼する。",
      "ウ": "一度クライアント証明書で認証を通過した端末には、社内の全サーバへのフルアクセス権限を恒久的に付与する。",
      "エ": "リモートアクセス手段としてVPN装置を増設し、社外端末をすべて社内LANアドレス体系に収容する。"
    },
    answer: "ア",
    explanation: "ゼロトラストは「Never Trust, Always Verify (決して信頼せず、常に検証せよ)」を原則とします。ネットワークの物理的・論理的境界に依存せず、すべてのアクセス要求に対してID、デバイス健全性、振る舞い等を検証して最小特権アクセスを動的に付与します。",
    appearances: [
      { year: "R7", yearLabel: "令和7年(予想)", yearNum: 2025, num: 2 }
    ]
  },
  {
    masterId: "PRED-03", category: "security", subcategory: "security", tags: ["SASE"],
    question: "【令和8年度 予想】ネットワーク機能とセキュリティ機能をクラウド上で統合して提供するアーキテクチャである「SASE (Secure Access Service Edge)」の説明として、適切なものはどれか。",
    choices: {
      "ア": "SD-WANなどのネットワーク接続機能と、SWG、CASB、ZTNA、FWaaSなどの包括的セキュリティ機能を単一のクラウドサービスとして統合・提供する。",
      "イ": "各拠点ごとにオンプレミスのUTM(統合脅威管理)アプライアンスを個別設置して集中管理する。",
      "ウ": "データセンター内のストレージ装置間のSAN(Storage Area Network)を暗号化する技術である。",
      "エ": "サーバのCPU上で仮想マシンを高速に実行するためのハードウェアアクセラレーション技術である。"
    },
    answer: "ア",
    explanation: "SASE(サシー: Secure Access Service Edge)は米ガートナーが提唱した概念で、SD-WANをはじめとするネットワーク機能と、SWG(セキュアWebゲートウェイ)、CASB、FWaaS、ZTNAなどのセキュリティ機能をクラウド上で一体化してエッジに提供するフレームワークです。",
    appearances: [
      { year: "R7", yearLabel: "令和7年(予想)", yearNum: 2025, num: 3 }
    ]
  },
  {
    masterId: "PRED-04", category: "network", subcategory: "routing", tags: ["SRv6"],
    question: "【令和8年度 予想】SRv6 (Segment Routing over IPv6) に関する記述として、適切なものはどれか。",
    choices: {
      "ア": "IPv6拡張ヘッダであるセグメントルーティングヘッダ(SRH)に中継ノードの識別子リストを格納し、ネットワーク側で状態を持たずにソースルーティングを実現する。",
      "イ": "MPLSのラベルスタックをIPv4ヘッダ内に直接埋め込む技術である。",
      "ウ": "ルータのBGPテーブルを暗号化してルーティング情報の漏洩を防ぐ技術である。",
      "エ": "IPv6パケットのホップリミットを固定化してルーティングループを許容する規格である。"
    },
    answer: "ア",
    explanation: "SRv6は、パケット送信元がIPv6拡張ヘッダ(SRH: Segment Routing Header)にパケットが通過すべき経路(セグメントリスト)を埋め込むソースルーティング技術です。中継ルータが個別パス状態を記憶する必要がなく、柔軟なサービスチェイニングやトラフィックエンジニアリングが可能です。",
    appearances: [
      { year: "R7", yearLabel: "令和7年(予想)", yearNum: 2025, num: 4 }
    ]
  },
  {
    masterId: "PRED-05", category: "security", subcategory: "security", tags: ["RPKI"],
    question: "【令和8年度 予想】BGPにおける経路ハイジャックや誤設定による不正な経路広告を防止するため、IPアドレス空間の正当な保有者とAS番号の対応関係を電子署名で検証する仕組みはどれか。",
    choices: {
      "ア": "RPKI (Resource Public Key Infrastructure)",
      "イ": "DNSSEC",
      "ウ": "IPsec AH",
      "エ": "RADIUS"
    },
    answer: "ア",
    explanation: "RPKI(Resource PKI)は、地域インターネットレジストリ(RIR)等が発行する電子証明書を用いて、IPプレフィックスを広告する正当な権限を持つAS番号の証明書(ROA: Route Origin Authorization)を発行し、BGPルータが不正な経路広告(BGPハイジャック)をフィルタリングできるようにする仕組みです。",
    appearances: [
      { year: "R7", yearLabel: "令和7年(予想)", yearNum: 2025, num: 5 }
    ]
  },
  {
    masterId: "PRED-06", category: "network", subcategory: "wireless", tags: ["Wi-Fi 6E", "Wi-Fi 7"],
    question: "【令和8年度 予想】Wi-Fi 6Eにおいて、従来の2.4GHz帯および5GHz帯に加えて新たに利用可能となった周波数帯はどれか。",
    choices: {
      "ア": "6GHz帯 (5.925GHz〜7.125GHz)",
      "イ": "60GHz帯 (ミリ波帯)",
      "ウ": "900MHz帯 (サブギガ帯)",
      "エ": "3.5GHz帯"
    },
    answer: "ア",
    explanation: "Wi-Fi 6Eは、Wi-Fi 6(IEEE 802.11ax)の通信規格を「6GHz帯」に拡張した規格です。電波干渉の少ない広大な連続帯域(最大160MHz幅チャネル)が利用でき、超高速・超低遅延通信を実現します。",
    appearances: [
      { year: "R7", yearLabel: "令和7年(予想)", yearNum: 2025, num: 6 }
    ]
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
  window.QUESTIONS_DB = QUESTIONS_DB;
  window.REUSE_MAP = REUSE_MAP;
  window.CATEGORY_INFO = CATEGORY_INFO;
  window.SUBCATEGORY_INFO = SUBCATEGORY_INFO;
}
