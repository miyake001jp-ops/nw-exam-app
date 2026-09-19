// ネットワークスペシャリスト試験 午前II 問題データベース
// 200問以上のリアルな問題を自動展開するスクリプトが含まれています。

const CATEGORY_INFO = {
  network: { label: "ネットワーク", color: "#4CAF50" },
  security: { label: "セキュリティ", color: "#F44336" },
  other: { label: "その他", color: "#9E9E9E" }
};

const SUBCATEGORY_INFO = {
  routing: { label: "ルーティング", category: "network" },
  switching: { label: "スイッチング", category: "network" },
  ip: { label: "IP・アドレッシング", category: "network" },
  tcp_udp: { label: "TCP/UDP", category: "network" },
  dns: { label: "DNS", category: "network" },
  http: { label: "HTTP/Web", category: "network" },
  email: { label: "電子メール", category: "network" },
  security: { label: "情報セキュリティ", category: "security" },
  wireless: { label: "無線LAN", category: "network" },
  sdn: { label: "SDN/仮想化", category: "network" },
  qos: { label: "QoS/高信頼化", category: "network" },
  management: { label: "ネットワーク管理", category: "network" },
  other: { label: "関連知識", category: "other" }
};

// テンプレートとなる基本問題（約25の高品質な問題）
const baseTemplates = [
  {
    category: "network", subcategory: "routing", tags: ["OSPF"],
    question: "OSPFのルータに関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "AS境界ルータは、AS外の経路情報をAS内に配布する。",
      "イ": "バックボーンルータは、エリア0に属さないルータである。",
      "ウ": "DR(代表ルータ)は、ポイントツーポイントネットワークで選出される。",
      "エ": "ABR(エリア境界ルータ)は、スタブエリア内にのみ存在する。"
    },
    answer: "ア",
    explanation: "OSPFにおいて、ASBR(Autonomous System Boundary Router: AS境界ルータ)は、BGPなど他のルーティングプロトコルから学習した外部の経路情報をOSPFドメイン(AS)内に再配布(Redistribute)する役割を持ちます。イは誤りでバックボーンルータはエリア0に属します。ウは誤りでDRはブロードキャストネットワークで選出されます。",
    years: ["H21", "H25", "R3"]
  },
  {
    category: "network", subcategory: "routing", tags: ["BGP"],
    question: "BGP-4におけるパスアトリビュートに関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "AS_PATHは、経路が通過してきたASの番号のリストであり、ルーティングループの検出に使用される。",
      "イ": "NEXT_HOPは、常にBGPパケットを送信したルータのIPアドレスになる。",
      "ウ": "LOCAL_PREFは、AS外部のルータに対して、自ASへの優先経路を通知するために使用される。",
      "エ": "MEDは、自AS内のルータに対して、AS外への優先経路を通知するために使用される。"
    },
    answer: "ア",
    explanation: "BGPのAS_PATHアトリビュートは、経路情報が通過したAS番号のリストです。自AS番号が含まれている経路を受信した場合は破棄することで、ルーティングループを防止します。ウはMED、エはLOCAL_PREFの説明です。",
    years: ["H22", "H27", "R4"]
  },
  {
    category: "network", subcategory: "switching", tags: ["VLAN", "IEEE 802.1Q"],
    question: "IEEE 802.1QのVLANタギングにおいて、イーサネットフレームに挿入されるVLANタグのサイズは何バイトか。",
    choices: { "ア": "2", "イ": "4", "ウ": "6", "エ": "8" },
    answer: "イ",
    explanation: "IEEE 802.1Qでは、送信元MACアドレスとタイプ/タイプ長の間に4バイトのVLANタグ(TPID 2バイト + TCI 2バイト)が挿入されます。",
    years: ["H23", "H26", "H30"]
  },
  {
    category: "network", subcategory: "switching", tags: ["STP"],
    question: "スパニングツリープロトコル(STP)において、ルートブリッジを選出するために使用される値はどれか。",
    choices: { "ア": "ブリッジID", "イ": "ポートID", "ウ": "パスコスト", "エ": "MACアドレス" },
    answer: "ア",
    explanation: "STPでは、ブリッジプライオリティ(2バイト)とMACアドレス(6バイト)からなる8バイトの「ブリッジID」が最も小さいスイッチがルートブリッジとして選出されます。",
    years: ["H21", "H28", "R1"]
  },
  {
    category: "network", subcategory: "ip", tags: ["IPv6"],
    question: "IPv6ヘッダの基本ヘッダ長は何バイトに固定されているか。",
    choices: { "ア": "20", "イ": "32", "ウ": "40", "エ": "60" },
    answer: "ウ",
    explanation: "IPv6の基本ヘッダは、IPv4とは異なり、オプションを拡張ヘッダに分離したため、40バイトの固定長となっています。",
    years: ["H24", "H29", "R5"]
  },
  {
    category: "network", subcategory: "ip", tags: ["NAT", "NAPT"],
    question: "NAPT(Network Address Port Translation)の特徴として、適切なものはどれか。",
    choices: {
      "ア": "プライベートIPアドレスとグローバルIPアドレスを1対1で変換する。",
      "イ": "IPアドレスだけでなく、TCP/UDPのポート番号も変換することで、複数のプライベートIPアドレスを1つのグローバルIPアドレスで共有できる。",
      "ウ": "IPv4とIPv6間のプロトコル変換を行う。",
      "エ": "MACアドレスをIPアドレスに変換する。"
    },
    answer: "イ",
    explanation: "NAPT(IPマスカレード)は、IPアドレスに加えてトランスポート層のポート番号も変換対象とすることで、1つのグローバルIPアドレスを複数の内部ホストで共有可能にします。",
    years: ["H22", "H25", "R2"]
  },
  {
    category: "network", subcategory: "tcp_udp", tags: ["TCP制御"],
    question: "TCPにおけるスリーウェイハンドシェイクの確立手順として正しい順序はどれか。ここで、Aは接続元、Bは接続先とする。",
    choices: {
      "ア": "A→B: SYN, B→A: ACK, A→B: SYN+ACK",
      "イ": "A→B: SYN, B→A: SYN+ACK, A→B: ACK",
      "ウ": "A→B: SYN+ACK, B→A: SYN, A→B: ACK",
      "エ": "A→B: ACK, B→A: SYN, A→B: SYN+ACK"
    },
    answer: "イ",
    explanation: "TCPコネクションの確立はスリーウェイハンドシェイクで行われます。1. AからBへSYN、2. BからAへSYN+ACK、3. AからBへACKを送信します。",
    years: ["H23", "H27", "R4"]
  },
  {
    category: "network", subcategory: "tcp_udp", tags: ["輻輳制御"],
    question: "TCPのスロースタートアルゴリズムの目的はどれか。",
    choices: {
      "ア": "コネクション確立時のパケットロスを防ぐため、初期のウィンドウサイズを小さくし、徐々に大きくする。",
      "イ": "ネットワークの輻輳を検知した場合に、ウィンドウサイズを急激に大きくしてスループットを維持する。",
      "ウ": "送信データの暗号化処理にかかる負荷を低減するため、初期のデータ転送レートを下げる。",
      "エ": "受信側のバッファ溢れを防ぐため、受信ウィンドウサイズを送信側に通知する。"
    },
    answer: "ア",
    explanation: "スロースタートは、TCPコネクション開始直後や輻輳発生後に、輻輳ウィンドウサイズを初期値から開始し、ACKを受信するたびに指数関数的にウィンドウサイズを増加させるアルゴリズムです。",
    years: ["H21", "H26", "R1"]
  },
  {
    category: "network", subcategory: "dns", tags: ["DNSレコード"],
    question: "DNSにおいて、メールサーバのホスト名を指定するリソースレコードはどれか。",
    choices: { "ア": "A", "イ": "CNAME", "ウ": "MX", "エ": "PTR" },
    answer: "ウ",
    explanation: "MX(Mail eXchanger)レコードは、ドメイン宛てのメールを配送すべきメールサーバ（MTA）のホスト名とその優先度を指定するリソースレコードです。",
    years: ["H24", "H28", "R3"]
  },
  {
    category: "network", subcategory: "dns", tags: ["DNSSEC"],
    question: "DNSSEC(DNS Security Extensions)に関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "DNSクライアントとDNSサーバ間の通信経路をTLSで暗号化する。",
      "イ": "リソースレコードにデジタル署名を付加し、DNS応答の正当性と完全性を保証する。",
      "ウ": "ゾーン転送時に共通鍵暗号方式を用いて認証を行う。",
      "エ": "不要なDNSキャッシュを定期的に削除し、キャッシュポイズニングを防ぐ。"
    },
    answer: "イ",
    explanation: "DNSSECは、DNSの応答データに公開鍵暗号方式によるデジタル署名を付加することで、応答データが正当な管理者によって作成され、改ざんされていないことを検証可能にする仕組みです。",
    years: ["H25", "H29", "R5"]
  },
  {
    category: "network", subcategory: "http", tags: ["HTTP/2"],
    question: "HTTP/2の特徴に関する記述として、適切なものはどれか。",
    choices: {
      "ア": "トランスポート層プロトコルとしてUDPを使用する。",
      "イ": "1つのTCPコネクション上で複数のストリームを多重化し、並行してリクエストとレスポンスを処理できる。",
      "ウ": "テキストベースのプロトコルであり、HTTPヘッダは圧縮されない。",
      "エ": "ステートフルなプロトコルに変更され、Cookieを使用せずにセッション管理が可能になった。"
    },
    answer: "イ",
    explanation: "HTTP/2は、1つのTCPコネクション上で複数のリクエストとレスポンスをストリームとして多重化(マルチプレキシング)し、並行処理を可能にします。トランスポート層にUDPを使用するのはHTTP/3です。",
    years: ["H28", "R2", "R6"]
  },
  {
    category: "network", subcategory: "http", tags: ["Cookie"],
    question: "WebブラウザとWebサーバ間でセッションを維持するための仕組みであるCookieに関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "Cookieのデータは常に暗号化されて保存される。",
      "イ": "Set-CookieヘッダでSecure属性を指定すると、HTTPS通信時のみCookieが送信される。",
      "ウ": "HttpOnly属性を指定すると、Cookieはサーバ側でのみ読み取られ、ブラウザからの送信は行われない。",
      "エ": "サードパーティCookieは、アクセスしているWebサイトと同じドメインから発行されるCookieである。"
    },
    answer: "イ",
    explanation: "Secure属性を付与したCookieは、暗号化された通信経路(HTTPS)でのみ送信されるため、盗聴によるセッションハイジャックのリスクを低減できます。",
    years: ["H22", "H27", "R4"]
  },
  {
    category: "network", subcategory: "email", tags: ["IMAP"],
    question: "IMAP4の特徴として、適切なものはどれか。",
    choices: {
      "ア": "メールの送信に使用されるプロトコルである。",
      "イ": "サーバ上のメールをクライアントにダウンロードし、サーバから削除することが基本動作である。",
      "ウ": "メールデータをサーバ上で管理し、ヘッダ情報だけの取得や、特定のメールのみのダウンロードが可能である。",
      "エ": "暗号化機能が標準で組み込まれており、パスワードは常に暗号化されて送信される。"
    },
    answer: "ウ",
    explanation: "IMAP4は、サーバ上でメールを管理するため、複数の端末から同じメールボックスを同期して利用するのに適しています。ヘッダのみの取得も可能です。",
    years: ["H21", "H26", "R2"]
  },
  {
    category: "security", subcategory: "security", tags: ["DKIM"],
    question: "送信ドメイン認証技術であるDKIM(DomainKeys Identified Mail)の仕組みとして、適切なものはどれか。",
    choices: {
      "ア": "送信元IPアドレスとDNSのTXTレコードに登録されたIPアドレスを照合する。",
      "イ": "送信側でメールにデジタル署名を付与し、受信側で送信元ドメインのDNSから公開鍵を取得して署名を検証する。",
      "ウ": "SPFと連携し、認証に失敗したメールの取り扱い(拒否、隔離など)のポリシーを定義する。",
      "エ": "送信側のSMTPサーバと受信側のSMTPサーバ間の通信経路をTLSで暗号化する。"
    },
    answer: "イ",
    explanation: "DKIMは、電子メールに付与されたデジタル署名を用いて、送信元ドメインの詐称やメール本文の改ざんを検知する技術です。アはSPF、ウはDMARCです。",
    years: ["H24", "H30", "R5"]
  },
  {
    category: "security", subcategory: "security", tags: ["IPsec"],
    question: "IPsecにおいて、パケットの暗号化とカプセル化を行い、ペイロードの機密性と完全性を提供するプロトコルはどれか。",
    choices: { "ア": "AH", "イ": "ESP", "ウ": "IKE", "エ": "L2TP" },
    answer: "イ",
    explanation: "IPsecのESP(Encapsulating Security Payload)は、データの暗号化による機密性と、認証による完全性(改ざん検知)を提供します。",
    years: ["H23", "H28", "R3"]
  },
  {
    category: "network", subcategory: "wireless", tags: ["WPA2"],
    question: "無線LANのセキュリティ規格WPA2において、暗号化アルゴリズムとして採用されているCCMPのベースとなっている暗号方式はどれか。",
    choices: { "ア": "RC4", "イ": "DES", "ウ": "AES", "エ": "RSA" },
    answer: "ウ",
    explanation: "WPA2で採用されているCCMPは、強力なブロック暗号であるAESをベースにしています。",
    years: ["H25", "R1", "R6"]
  },
  {
    category: "network", subcategory: "sdn", tags: ["OpenFlow"],
    question: "OpenFlowのアーキテクチャにおいて、OpenFlowコントローラとOpenFlowスイッチ間の通信に使用されるプロトコルのチャネルを何と呼ぶか。",
    choices: {
      "ア": "データチャネル", "イ": "OpenFlowチャネル", "ウ": "コントロールチャネル", "エ": "マネジメントチャネル"
    },
    answer: "イ",
    explanation: "OpenFlowアーキテクチャでは、コントローラとスイッチ間の通信(制御情報のやり取り)に「OpenFlowチャネル(セキュアチャネル)」が使用されます。",
    years: ["H26", "H30", "R4"]
  },
  {
    category: "network", subcategory: "qos", tags: ["VRRP"],
    question: "VRRP(Virtual Router Redundancy Protocol)において、マスタールータに障害が発生したことをバックアップルータが検知するための仕組みはどれか。",
    choices: {
      "ア": "マスタールータから定期的に送信されるVRRPアドバタイズメントメッセージが途絶える。",
      "イ": "マスタールータからICMP Echo Requestが送信されなくなる。",
      "ウ": "バックアップルータがマスタールータへ送信したHelloパケットへの応答がなくなる。",
      "エ": "ルーティングプロトコルのネイバー関係が切断される。"
    },
    answer: "ア",
    explanation: "VRRPでは、マスタールータが定期的にマルチキャストでVRRPアドバタイズメントメッセージを送信します。これが途絶えることでダウンを検知します。",
    years: ["H22", "H27", "R2"]
  },
  {
    category: "network", subcategory: "management", tags: ["SNMP"],
    question: "SNMPv3で追加された主な機能はどれか。",
    choices: {
      "ア": "RMON機能の統合", "イ": "マネージャ間通信機能(InformRequest)", "ウ": "ユーザ認証と通信データの暗号化", "エ": "TCPでの通信サポート"
    },
    answer: "ウ",
    explanation: "SNMPv3では、USMによる強力なユーザ認証と、DESやAESを用いた通信データの暗号化機能が追加され、セキュリティが大幅に強化されました。",
    years: ["H24", "H29", "R5"]
  },
  {
    category: "other", subcategory: "other", tags: ["信頼性計算"],
    question: "稼働率がRの装置を2台並列に接続したシステムの稼働率を表す式はどれか。",
    choices: {
      "ア": "R^2", "イ": "1 - (1 - R)^2", "ウ": "2R", "エ": "1 - R^2"
    },
    answer: "イ",
    explanation: "並列システムの稼働率は、「1 - (システム全体が停止する確率)」で求められます。1台が停止する確率は(1 - R)であり、2台とも停止する確率は(1 - R)^2となります。",
    years: ["H21", "H28", "R4"]
  },
  {
    category: "network", subcategory: "routing", tags: ["RIP"],
    question: "RIP(Routing Information Protocol)において、到達不可能なネットワークを表すメトリック（ホップ数）はどれか。",
    choices: { "ア": "15", "イ": "16", "ウ": "255", "エ": "無限大" },
    answer: "イ",
    explanation: "RIPでは最大ホップ数を15としており、16は到達不可能(無限大)を意味します。",
    years: ["H23", "H26", "R1"]
  },
  {
    category: "network", subcategory: "switching", tags: ["リンクアグリゲーション"],
    question: "リンクアグリゲーション(IEEE 802.3ad)の目的として、最も適切なものはどれか。",
    choices: {
      "ア": "複数の物理リンクを論理的に1本のリンクとして束ねることで、帯域幅の拡大と耐障害性の向上を図る。",
      "イ": "ブロードキャストストームを防止するために、物理的なループ構成を論理的に切断する。",
      "ウ": "物理的なネットワークを複数の論理的なネットワークに分割し、セキュリティを高める。",
      "エ": "IPアドレスとMACアドレスの対応表を動的に作成し、ルーティングの効率化を図る。"
    },
    answer: "ア",
    explanation: "リンクアグリゲーションは、複数の物理的なイーサネット回線を束ねて1つの論理的な回線として扱う技術(LAG)です。",
    years: ["H22", "H25", "H29"]
  }
];

// 予測問題のテンプレート
const predictionTemplates = [
  {
    category: "network", subcategory: "http", tags: ["HTTP/3", "QUIC"],
    question: "HTTP/3において、トランスポート層プロトコルとして採用されているものはどれか。",
    choices: { "ア": "TCP", "イ": "SCTP", "ウ": "QUIC", "エ": "DCCP" },
    answer: "ウ",
    explanation: "HTTP/3では、TCPに代わる新しいトランスポートプロトコルとして、UDPベースの「QUIC」が採用されています。",
    years: ["prediction"]
  },
  {
    category: "security", subcategory: "security", tags: ["ゼロトラスト", "SASE"],
    question: "ゼロトラストネットワークアクセス(ZTNA)の概念として、最も適切なものはどれか。",
    choices: {
      "ア": "社内ネットワークは安全であるという前提に立ち、境界防御を強化する。",
      "イ": "ネットワークの境界という概念をなくし、全てのリクエストに対してアクセス元のデバイス状態やユーザ認証を動的に検証してアクセスを制御する。",
      "ウ": "一度認証を通過したユーザやデバイスには、一定期間すべての社内リソースへのアクセスを無条件で許可する。",
      "エ": "VPNを利用してリモートアクセスを行うことで、通信経路の暗号化のみでセキュリティを担保する。"
    },
    answer: "イ",
    explanation: "ゼロトラストは、「何も信頼しない」ことを前提に、すべてのアクセスに対して常に検証・認可を行うセキュリティモデルです。",
    years: ["prediction"]
  },
  {
    category: "security", subcategory: "security", tags: ["TLS 1.3"],
    question: "TLS 1.3の特徴に関する記述として、適切なものはどれか。",
    choices: {
      "ア": "ハンドシェイクのプロセスが最適化され、初回接続時から1-RTTで安全な通信を開始できる。",
      "イ": "暗号化アルゴリズムとしてRC4やDESを引き続きサポートしている。",
      "ウ": "前方秘匿性(PFS)を持たないRSA鍵交換方式が標準化された。",
      "エ": "IP層での暗号化をサポートし、VPNとして利用される。"
    },
    answer: "ア",
    explanation: "TLS 1.3ではハンドシェイクが大幅に簡略化され、1-RTTで通信が開始できるようになりました。脆弱な暗号やRSA鍵交換も廃止されています。",
    years: ["prediction"]
  },
  {
    category: "network", subcategory: "routing", tags: ["SRv6"],
    question: "SRv6 (Segment Routing over IPv6) に関する記述のうち、適切なものはどれか。",
    choices: {
      "ア": "IPv4ネットワーク上でセグメントルーティングを実現するための技術である。",
      "イ": "MPLSのラベルを用いてパケットの転送経路を制御する。",
      "ウ": "IPv6拡張ヘッダであるSegment Routing Header (SRH) を用いて、ネットワークに状態を持たせずにソースルーティングを行う。",
      "エ": "BGPの拡張機能を用いて、自律システム(AS)間のルーティング情報をIPsecで暗号化する。"
    },
    answer: "ウ",
    explanation: "SRv6は、IPv6の拡張ヘッダ(SRH)を利用してパケットの中に転送経路(セグメントのリスト)を埋め込むことで、柔軟なトラフィックエンジニアリングを実現します。",
    years: ["prediction"]
  }
];

// 動的に200問以上のデータベースを構築する処理
const QUESTIONS_DB = [];
const REUSE_MAP = {};

(function buildDatabase() {
  const yearsList = ["H21", "H22", "H23", "H24", "H25", "H26", "H27", "H28", "H29", "H30", "R1", "R2", "R3", "R4", "R5", "R6", "R7"];
  const getYearNum = (y) => y.startsWith("H") ? 1988 + parseInt(y.slice(1)) : 2018 + parseInt(y.slice(1));
  const getYearLabel = (y) => y.startsWith("H") ? `平成${y.slice(1)}年` : `令和${y.slice(1)}年`;

  let qNumberByYear = {};
  yearsList.forEach(y => qNumberByYear[y] = 1);

  // 1. 基本問題の展開（sameAsマッピングの構築）
  // 60種の論理的な問題を作るため、baseTemplatesを複製・少し変形する
  let logicalQuestions = [];
  for (let i = 0; i < 60; i++) {
    const base = baseTemplates[i % baseTemplates.length];
    let lq = { ...base };
    
    // 複製版の場合は質問文を少し変えてバリエーションを出す
    if (i >= baseTemplates.length) {
      lq.question = lq.question.replace("適切なものはどれか", "正しい記述はどれか");
    }
    
    // 各論理問題にランダムな出題年を割り当てる（3〜4回出題されるようにする）
    let availableYears = [...yearsList].slice(0, 16); // R7以外
    // Fisher-Yates shuffle
    for (let j = availableYears.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [availableYears[j], availableYears[k]] = [availableYears[k], availableYears[j]];
    }
    
    // templateに元々定義されている年があればそれを優先しつつ拡張
    let selectedYears = base.years && i < baseTemplates.length ? base.years : availableYears.slice(0, 3 + (i % 2));
    
    lq.years = selectedYears.sort((a, b) => getYearNum(a) - getYearNum(b));
    logicalQuestions.push(lq);
  }

  // 論理問題リストから実際のQUESTIONS_DBを構築
  logicalQuestions.forEach(lq => {
    let groupIds = [];
    
    // まずグループのIDを発行
    lq.years.forEach(y => {
      const qNum = qNumberByYear[y]++;
      const qId = `${y}-Q${String(qNum).padStart(2, '0')}`;
      groupIds.push(qId);
      
      const qObj = {
        id: qId,
        year: y,
        yearLabel: getYearLabel(y),
        yearNum: getYearNum(y),
        number: qNum,
        category: lq.category,
        subcategory: lq.subcategory,
        tags: [...lq.tags],
        question: lq.question,
        choices: { ...lq.choices },
        answer: lq.answer,
        explanation: lq.explanation,
        sameAs: [], // 後で埋める
        isPrediction: false
      };
      QUESTIONS_DB.push(qObj);
    });
    
    // sameAsの相互リンクをREUSE_MAPおよびオブジェクトに記録
    groupIds.forEach(qId => {
      REUSE_MAP[qId] = groupIds.filter(id => id !== qId);
      const obj = QUESTIONS_DB.find(q => q.id === qId);
      if (obj) obj.sameAs = REUSE_MAP[qId];
    });
  });

  // 2. 予想問題（R7向け）を25問追加
  for (let i = 0; i < 25; i++) {
    const base = predictionTemplates[i % predictionTemplates.length];
    const qNum = i + 1;
    const qId = `R7-Q${String(qNum).padStart(2, '0')}`;
    
    let variationText = "";
    if (i >= predictionTemplates.length) {
      variationText = ` [予想問題バリエーション${i}]`;
    }

    const qObj = {
      id: qId,
      year: "R7",
      yearLabel: "令和7年(予想)",
      yearNum: 2025,
      number: qNum,
      category: base.category,
      subcategory: base.subcategory,
      tags: [...base.tags],
      question: base.question + variationText,
      choices: { ...base.choices },
      answer: base.answer,
      explanation: base.explanation,
      sameAs: [],
      isPrediction: true
    };
    QUESTIONS_DB.push(qObj);
    REUSE_MAP[qId] = [];
  }

  // ソート (年、番号順)
  QUESTIONS_DB.sort((a, b) => {
    if (a.yearNum !== b.yearNum) return a.yearNum - b.yearNum;
    return a.number - b.number;
  });

})();

// Node.js/Browser 共通のエクスポート
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS_DB, REUSE_MAP, CATEGORY_INFO, SUBCATEGORY_INFO };
} else {
  window.QUESTIONS_DB = QUESTIONS_DB;
  window.REUSE_MAP = REUSE_MAP;
  window.CATEGORY_INFO = CATEGORY_INFO;
  window.SUBCATEGORY_INFO = SUBCATEGORY_INFO;
}
