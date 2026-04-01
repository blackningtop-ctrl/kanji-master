import { MnemonicData } from '../types/kanji';

export const MNEMONIC_DATA: MnemonicData[] = [
  // ============================================================
  // Grade 1 Kanji Mnemonics (80 kanji × 3 languages = 240 entries)
  // ============================================================

  // 一 (one) - kanjiId: 1
  { id: 1, kanjiId: 1, language: 'ja', story: '一本の横線だけ。地平線のように、すべての始まりを表す最もシンプルな漢字です。', isDefault: true, authorId: null },
  { id: 2, kanjiId: 1, language: 'ko', story: '하나의 가로선만으로 이루어진 가장 단순한 한자입니다. 지평선처럼 모든 것의 시작을 나타냅니다.', isDefault: true, authorId: null },
  { id: 3, kanjiId: 1, language: 'en', story: 'A single horizontal line — the simplest kanji. Like a horizon line, it represents the beginning of everything: one.', isDefault: true, authorId: null },

  // 右 (right) - kanjiId: 2
  { id: 4, kanjiId: 2, language: 'ja', story: 'ナ（手）と口の組み合わせ。右手で食べ物を口に運ぶ動作から「みぎ」の意味になりました。', isDefault: true, authorId: null },
  { id: 5, kanjiId: 2, language: 'ko', story: '손(ナ)과 입(口)의 조합입니다. 오른손으로 음식을 입에 넣는 모습에서 "오른쪽"이라는 뜻이 되었습니다.', isDefault: true, authorId: null },
  { id: 6, kanjiId: 2, language: 'en', story: 'A hand (ナ) reaching toward a mouth (口). You eat with your RIGHT hand, bringing food to your mouth.', isDefault: true, authorId: null },

  // 雨 (rain) - kanjiId: 3
  { id: 7, kanjiId: 3, language: 'ja', story: '上の一は空、冂は雲、中の点々は落ちてくる雨粒です。窓から雨を見ている絵のようです。', isDefault: true, authorId: null },
  { id: 8, kanjiId: 3, language: 'ko', story: '위의 一은 하늘, 冂은 구름, 안의 점들은 떨어지는 빗방울입니다. 창문으로 비를 보는 그림 같습니다.', isDefault: true, authorId: null },
  { id: 9, kanjiId: 3, language: 'en', story: 'The top line is the sky, the box below is a cloud, and the dots inside are raindrops falling down. A picture of rain through a window.', isDefault: true, authorId: null },

  // 円 (circle/yen) - kanjiId: 4
  { id: 10, kanjiId: 4, language: 'ja', story: '冂（囲い）の中に縦と横の線。丸いコインの中に十字の模様がある日本のお金のイメージです。', isDefault: true, authorId: null },
  { id: 11, kanjiId: 4, language: 'ko', story: '네모난 틀(冂) 안에 세로와 가로선이 있습니다. 동그란 동전 안에 십자 무늬가 있는 일본 돈을 떠올려 보세요.', isDefault: true, authorId: null },
  { id: 12, kanjiId: 4, language: 'en', story: 'An enclosure with lines inside — like a round coin with markings. This is the symbol for the Japanese yen (¥) and also means circle.', isDefault: true, authorId: null },

  // 王 (king) - kanjiId: 5
  { id: 13, kanjiId: 5, language: 'ja', story: '三本の横線は天・人・地を表し、縦線がそれらをつなぐ存在＝王様です。', isDefault: true, authorId: null },
  { id: 14, kanjiId: 5, language: 'ko', story: '세 개의 가로선은 하늘, 사람, 땅을 나타내고, 세로선이 이 셋을 연결하는 존재 = 왕입니다.', isDefault: true, authorId: null },
  { id: 15, kanjiId: 5, language: 'en', story: 'Three horizontal lines represent heaven, humanity, and earth. The vertical line connects all three — that is the king who rules over all.', isDefault: true, authorId: null },

  // 音 (sound) - kanjiId: 6
  { id: 16, kanjiId: 6, language: 'ja', story: '立（立つ）の下に日。太陽が昇る時に立ち上がって声を出す＝音が生まれます。', isDefault: true, authorId: null },
  { id: 17, kanjiId: 6, language: 'ko', story: '立(서다) 아래에 日(해)가 있습니다. 해가 뜰 때 일어나서 소리를 내는 모습입니다.', isDefault: true, authorId: null },
  { id: 18, kanjiId: 6, language: 'en', story: 'Stand (立) above the sun (日). When the sun rises and you stand up, you make a sound — the rooster crows at dawn!', isDefault: true, authorId: null },

  // 下 (below/down) - kanjiId: 7
  { id: 19, kanjiId: 7, language: 'ja', story: '横線の下に垂れ下がる線と点。基準線から下を指し示す矢印のような形です。', isDefault: true, authorId: null },
  { id: 20, kanjiId: 7, language: 'ko', story: '가로선 아래로 내려가는 선과 점이 있습니다. 기준선 아래를 가리키는 화살표 같은 모양입니다.', isDefault: true, authorId: null },
  { id: 21, kanjiId: 7, language: 'en', story: 'A horizontal baseline with a stroke hanging down below it — like an arrow pointing downward. Below, under, down.', isDefault: true, authorId: null },

  // 火 (fire) - kanjiId: 8
  { id: 22, kanjiId: 8, language: 'ja', story: '人が両手を広げた形の上に火花が散っています。焚き火の炎が燃え上がる姿です。', isDefault: true, authorId: null },
  { id: 23, kanjiId: 8, language: 'ko', story: '사람이 양팔을 벌린 모양 위에 불꽃이 튀고 있습니다. 모닥불의 불꽃이 타오르는 모습입니다.', isDefault: true, authorId: null },
  { id: 24, kanjiId: 8, language: 'en', story: 'A person with arms spread wide, with sparks flying off — like a campfire with flames leaping up and sparks dancing around.', isDefault: true, authorId: null },

  // 花 (flower) - kanjiId: 9
  { id: 25, kanjiId: 9, language: 'ja', story: '上のくさかんむり（艹）は草を表し、下の化は「変化する」意味。草が変化して美しい花になります。', isDefault: true, authorId: null },
  { id: 26, kanjiId: 9, language: 'ko', story: '위의 초두머리(艹)는 풀을 나타내고, 아래의 化는 "변하다"라는 뜻입니다. 풀이 변화하여 아름다운 꽃이 됩니다.', isDefault: true, authorId: null },
  { id: 27, kanjiId: 9, language: 'en', story: 'Grass radical (艹) on top with "change" (化) below. A plant that transforms into something beautiful — a flower blooming.', isDefault: true, authorId: null },

  // 貝 (shellfish) - kanjiId: 10
  { id: 28, kanjiId: 10, language: 'ja', story: '目のような形の下に八（足）。目のような模様がある貝殻から、小さな足が出ている姿です。', isDefault: true, authorId: null },
  { id: 29, kanjiId: 10, language: 'ko', story: '눈(目) 모양 아래에 八(다리)이 있습니다. 눈 같은 무늬가 있는 조개껍데기에서 작은 다리가 나온 모습입니다.', isDefault: true, authorId: null },
  { id: 30, kanjiId: 10, language: 'en', story: 'An eye-like shape (目) with legs (八) below — a shellfish with patterns on its shell and little feet poking out.', isDefault: true, authorId: null },

  // 学 (study) - kanjiId: 11
  { id: 31, kanjiId: 11, language: 'ja', story: '上の部分は子供が両手を広げて学ぶ姿、下の子は「子供」。子供が一生懸命勉強しています。', isDefault: true, authorId: null },
  { id: 32, kanjiId: 11, language: 'ko', story: '윗부분은 아이가 양손을 펼쳐 배우는 모습, 아래의 子는 "아이"입니다. 아이가 열심히 공부하고 있습니다.', isDefault: true, authorId: null },
  { id: 33, kanjiId: 11, language: 'en', story: 'A child (子) under a roof with reaching hands above — a child eagerly studying under a teacher, grasping for knowledge.', isDefault: true, authorId: null },

  // 気 (spirit/air) - kanjiId: 12
  { id: 34, kanjiId: 12, language: 'ja', story: '气の中に〆。空気の流れの中にエネルギーが渦巻いている。目に見えない「気」の力です。', isDefault: true, authorId: null },
  { id: 35, kanjiId: 12, language: 'ko', story: '气 안에 에너지가 소용돌이치고 있습니다. 공기의 흐름 속에 보이지 않는 "기"의 힘이 담겨 있습니다.', isDefault: true, authorId: null },
  { id: 36, kanjiId: 12, language: 'en', story: 'Steam (气) with swirling energy inside — invisible spirit and energy flowing through the air like breath on a cold day.', isDefault: true, authorId: null },

  // 九 (nine) - kanjiId: 13
  { id: 37, kanjiId: 13, language: 'ja', story: '力に似た形で、曲がった腕のよう。九回腕立て伏せをした後の疲れた腕の形です。', isDefault: true, authorId: null },
  { id: 38, kanjiId: 13, language: 'ko', story: '力(힘)과 비슷한 모양으로, 구부러진 팔 같습니다. 아홉 번 팔굽혀펴기를 한 후 지친 팔의 모습입니다.', isDefault: true, authorId: null },
  { id: 39, kanjiId: 13, language: 'en', story: 'Looks like a bent arm, similar to "power" (力). After nine push-ups your arm is bent and tired — that is nine.', isDefault: true, authorId: null },

  // 休 (rest) - kanjiId: 14
  { id: 40, kanjiId: 14, language: 'ja', story: '亻（人）が木にもたれている。疲れた人が大きな木の下で休んでいる姿です。', isDefault: true, authorId: null },
  { id: 41, kanjiId: 14, language: 'ko', story: '사람(亻)이 나무(木)에 기대어 있습니다. 피곤한 사람이 큰 나무 아래서 쉬고 있는 모습입니다.', isDefault: true, authorId: null },
  { id: 42, kanjiId: 14, language: 'en', story: 'A person (亻) leaning against a tree (木). A tired traveler resting in the shade of a big tree — rest, holiday.', isDefault: true, authorId: null },

  // 玉 (jewel) - kanjiId: 15
  { id: 43, kanjiId: 15, language: 'ja', story: '王（王様）に点を一つ加えた形。王様が持つ宝石、つまり玉（たま）です。', isDefault: true, authorId: null },
  { id: 44, kanjiId: 15, language: 'ko', story: '王(왕)에 점 하나를 추가한 모양입니다. 왕이 가진 보석, 즉 구슬(옥)입니다.', isDefault: true, authorId: null },
  { id: 45, kanjiId: 15, language: 'en', story: 'King (王) with an extra dot — the precious jewel that belongs to the king. The dot is the gem that makes it special.', isDefault: true, authorId: null },

  // 金 (gold/money) - kanjiId: 16
  { id: 46, kanjiId: 16, language: 'ja', story: '人が屋根の下で土を掘っている形。鉱山で金を掘り出す人の姿です。', isDefault: true, authorId: null },
  { id: 47, kanjiId: 16, language: 'ko', story: '사람이 지붕 아래에서 흙을 파고 있는 모양입니다. 광산에서 금을 캐내는 사람의 모습입니다.', isDefault: true, authorId: null },
  { id: 48, kanjiId: 16, language: 'en', story: 'A roof over a person digging in the earth — a miner underground digging for gold nuggets. Gold, money, metal.', isDefault: true, authorId: null },

  // 空 (sky/empty) - kanjiId: 17
  { id: 49, kanjiId: 17, language: 'ja', story: '穴（あな）の下に工。穴の向こうに広がる空っぽの空間＝空です。', isDefault: true, authorId: null },
  { id: 50, kanjiId: 17, language: 'ko', story: '구멍(穴) 아래에 工이 있습니다. 구멍 너머로 펼쳐지는 텅 빈 공간 = 하늘입니다.', isDefault: true, authorId: null },
  { id: 51, kanjiId: 17, language: 'en', story: 'A hole (穴) above craftsmanship (工). Look through a hole in the roof and you see the vast, empty sky above.', isDefault: true, authorId: null },

  // 月 (moon/month) - kanjiId: 18
  { id: 52, kanjiId: 18, language: 'ja', story: '三日月の形をそのまま漢字にしたもの。夜空に浮かぶ細い月の姿です。', isDefault: true, authorId: null },
  { id: 53, kanjiId: 18, language: 'ko', story: '초승달의 모양을 그대로 한자로 만든 것입니다. 밤하늘에 떠 있는 가느다란 달의 모습입니다.', isDefault: true, authorId: null },
  { id: 54, kanjiId: 18, language: 'en', story: 'A crescent moon shape turned into a character — the thin sliver of the moon hanging in the night sky. Moon and month.', isDefault: true, authorId: null },

  // 犬 (dog) - kanjiId: 19
  { id: 55, kanjiId: 19, language: 'ja', story: '大（大きい）に点を一つ足した形。大きな体に耳がピンと立った犬の姿です。', isDefault: true, authorId: null },
  { id: 56, kanjiId: 19, language: 'ko', story: '大(크다)에 점 하나를 더한 모양입니다. 큰 몸에 귀가 쫑긋 서 있는 개의 모습입니다.', isDefault: true, authorId: null },
  { id: 57, kanjiId: 19, language: 'en', story: 'Big (大) with an extra dot — a big animal with a spot on it. A large dog with a marking on its ear.', isDefault: true, authorId: null },

  // 見 (see) - kanjiId: 20
  { id: 58, kanjiId: 20, language: 'ja', story: '目の下に人の足（儿）。目を大きく開いて歩きながら見ている人の姿です。', isDefault: true, authorId: null },
  { id: 59, kanjiId: 20, language: 'ko', story: '눈(目) 아래에 사람의 다리(儿)가 있습니다. 눈을 크게 뜨고 걸으며 보고 있는 사람의 모습입니다.', isDefault: true, authorId: null },
  { id: 60, kanjiId: 20, language: 'en', story: 'An eye (目) on legs (儿) — a giant walking eye. When you walk around looking at things, you see the world.', isDefault: true, authorId: null },

  // 五 (five) - kanjiId: 21
  { id: 61, kanjiId: 21, language: 'ja', story: '上下の横線に挟まれたクロスした線。五本の指を交差させた形に見えます。', isDefault: true, authorId: null },
  { id: 62, kanjiId: 21, language: 'ko', story: '위아래 가로선 사이에 교차한 선이 있습니다. 다섯 손가락을 교차시킨 모양처럼 보입니다.', isDefault: true, authorId: null },
  { id: 63, kanjiId: 21, language: 'en', story: 'Crossed lines between two horizontal bars — like five fingers interlocked. The crisscross pattern represents five.', isDefault: true, authorId: null },

  // 口 (mouth) - kanjiId: 22
  { id: 64, kanjiId: 22, language: 'ja', story: '大きく開いた口をそのまま四角で表した象形文字。シンプルに開いた口の形です。', isDefault: true, authorId: null },
  { id: 65, kanjiId: 22, language: 'ko', story: '크게 벌린 입을 그대로 네모로 나타낸 상형문자입니다. 단순하게 열린 입 모양입니다.', isDefault: true, authorId: null },
  { id: 66, kanjiId: 22, language: 'en', story: 'A simple square — an open mouth seen from the front. Say "ahhh" and your mouth makes this square shape.', isDefault: true, authorId: null },

  // 校 (school) - kanjiId: 23
  { id: 67, kanjiId: 23, language: 'ja', story: '木（木偏）の横に交わる形。木造の校舎で子供たちが交流する学校です。', isDefault: true, authorId: null },
  { id: 68, kanjiId: 23, language: 'ko', story: '나무(木) 옆에 교차하는(交) 모양입니다. 나무로 만든 교사에서 아이들이 교류하는 학교입니다.', isDefault: true, authorId: null },
  { id: 69, kanjiId: 23, language: 'en', story: 'Tree (木) plus "cross/mix" (交). A wooden building where students cross paths and exchange ideas — a school.', isDefault: true, authorId: null },

  // 左 (left) - kanjiId: 24
  { id: 70, kanjiId: 24, language: 'ja', story: 'ナ（手）と工（道具）の組み合わせ。左手で道具を持って仕事をする姿です。', isDefault: true, authorId: null },
  { id: 71, kanjiId: 24, language: 'ko', story: '손(ナ)과 도구(工)의 조합입니다. 왼손으로 도구를 들고 일하는 모습입니다.', isDefault: true, authorId: null },
  { id: 72, kanjiId: 24, language: 'en', story: 'A hand (ナ) holding a tool (工). Your LEFT hand assists by holding the tool while the right hand does the main work.', isDefault: true, authorId: null },

  // 三 (three) - kanjiId: 25
  { id: 73, kanjiId: 25, language: 'ja', story: '三本の横線。一は一本、二は二本、そして三は三本！数えるだけで覚えられます。', isDefault: true, authorId: null },
  { id: 74, kanjiId: 25, language: 'ko', story: '세 개의 가로선입니다. 一은 한 줄, 二는 두 줄, 그리고 三은 세 줄! 세기만 하면 외울 수 있습니다.', isDefault: true, authorId: null },
  { id: 75, kanjiId: 25, language: 'en', story: 'Three horizontal lines stacked up — one line is one, two lines is two, three lines is three. Count the lines!', isDefault: true, authorId: null },

  // 山 (mountain) - kanjiId: 26
  { id: 76, kanjiId: 26, language: 'ja', story: '真ん中に高い峰、両側に低い峰。山脈のシルエットをそのまま描いた象形文字です。', isDefault: true, authorId: null },
  { id: 77, kanjiId: 26, language: 'ko', story: '가운데 높은 봉우리, 양쪽에 낮은 봉우리. 산맥의 실루엣을 그대로 그린 상형문자입니다.', isDefault: true, authorId: null },
  { id: 78, kanjiId: 26, language: 'en', story: 'Three peaks — a tall one in the middle with two shorter ones on each side. A mountain range silhouette.', isDefault: true, authorId: null },

  // 子 (child) - kanjiId: 27
  { id: 79, kanjiId: 27, language: 'ja', story: '赤ちゃんが両手を広げている姿。頭が大きく、手を伸ばしている小さな子供です。', isDefault: true, authorId: null },
  { id: 80, kanjiId: 27, language: 'ko', story: '아기가 양팔을 벌리고 있는 모습입니다. 머리가 크고, 손을 뻗고 있는 작은 아이입니다.', isDefault: true, authorId: null },
  { id: 81, kanjiId: 27, language: 'en', story: 'A baby with a large head and outstretched arms, swaddled below — a small child reaching up to be held.', isDefault: true, authorId: null },

  // 四 (four) - kanjiId: 28
  { id: 82, kanjiId: 28, language: 'ja', story: '口（囲み）の中に八のような形。四方を囲んだ箱の中に物が入っています。', isDefault: true, authorId: null },
  { id: 83, kanjiId: 28, language: 'ko', story: '입(口) 안에 八 같은 모양이 있습니다. 사방을 둘러싼 상자 안에 물건이 들어 있습니다.', isDefault: true, authorId: null },
  { id: 84, kanjiId: 28, language: 'en', story: 'An enclosure with divided contents inside — like a box split into four compartments. Four sections in a box.', isDefault: true, authorId: null },

  // 糸 (thread) - kanjiId: 29
  { id: 85, kanjiId: 29, language: 'ja', story: '上の幺は細い繊維が絡まった形、下の小は小さな糸玉。細い糸が巻かれている姿です。', isDefault: true, authorId: null },
  { id: 86, kanjiId: 29, language: 'ko', story: '위의 幺는 가는 섬유가 얽힌 모양, 아래의 小는 작은 실타래. 가는 실이 감겨 있는 모습입니다.', isDefault: true, authorId: null },
  { id: 87, kanjiId: 29, language: 'en', story: 'Twisted fibers on top with a small bundle below — strands of thread being spun and wound into a tiny ball of string.', isDefault: true, authorId: null },

  // 字 (character/letter) - kanjiId: 30
  { id: 88, kanjiId: 30, language: 'ja', story: '宀（屋根）の下に子（子供）。家の中で子供が文字を習っている姿です。', isDefault: true, authorId: null },
  { id: 89, kanjiId: 30, language: 'ko', story: '지붕(宀) 아래에 아이(子)가 있습니다. 집 안에서 아이가 글자를 배우고 있는 모습입니다.', isDefault: true, authorId: null },
  { id: 90, kanjiId: 30, language: 'en', story: 'A child (子) under a roof (宀). A child born under a roof learns to write characters — that is literacy.', isDefault: true, authorId: null },

  // 耳 (ear) - kanjiId: 31
  { id: 91, kanjiId: 31, language: 'ja', story: '人間の耳を正面から見た象形文字。外側の輪郭と内側の穴がはっきり見えます。', isDefault: true, authorId: null },
  { id: 92, kanjiId: 31, language: 'ko', story: '사람의 귀를 정면에서 본 상형문자입니다. 바깥쪽 윤곽과 안쪽의 구멍이 뚜렷하게 보입니다.', isDefault: true, authorId: null },
  { id: 93, kanjiId: 31, language: 'en', story: 'A pictograph of a human ear seen from the front — the outer curve and inner folds are clearly visible in the strokes.', isDefault: true, authorId: null },

  // 七 (seven) - kanjiId: 32
  { id: 94, kanjiId: 32, language: 'ja', story: '十（十）を切った形。十を横に切ると七になる！ナイフで切った跡のような形です。', isDefault: true, authorId: null },
  { id: 95, kanjiId: 32, language: 'ko', story: '十(열)을 자른 모양입니다. 열에서 세 개를 잘라내면 일곱이 됩니다! 칼로 자른 자국 같은 모양입니다.', isDefault: true, authorId: null },
  { id: 96, kanjiId: 32, language: 'en', story: 'Looks like the number ten (十) with a slash cutting through it — cut three away from ten and you get seven.', isDefault: true, authorId: null },

  // 車 (car/vehicle) - kanjiId: 33
  { id: 97, kanjiId: 33, language: 'ja', story: '車を上から見た形。真ん中の横線は車軸、上下は車輪、縦線は車体です。', isDefault: true, authorId: null },
  { id: 98, kanjiId: 33, language: 'ko', story: '수레를 위에서 내려다본 모양입니다. 가운데 가로선은 차축, 위아래는 바퀴, 세로선은 차체입니다.', isDefault: true, authorId: null },
  { id: 99, kanjiId: 33, language: 'en', story: 'A cart seen from above — the vertical line is the body, horizontals are the axles, and top/bottom are the wheels rolling.', isDefault: true, authorId: null },

  // 手 (hand) - kanjiId: 34
  { id: 100, kanjiId: 34, language: 'ja', story: '手のひらを広げた形を簡略化したもの。指と手のひらの線が見えます。', isDefault: true, authorId: null },
  { id: 101, kanjiId: 34, language: 'ko', story: '손바닥을 펼친 모양을 간략화한 것입니다. 손가락과 손바닥의 선이 보입니다.', isDefault: true, authorId: null },
  { id: 102, kanjiId: 34, language: 'en', story: 'A simplified open palm — you can see the fingers branching out and the lines of the hand. Wave your hand hello!', isDefault: true, authorId: null },

  // 十 (ten) - kanjiId: 35
  { id: 103, kanjiId: 35, language: 'ja', story: '横線と縦線が交差した十字形。十本の指を交差させた形です。プラス記号にも似ています。', isDefault: true, authorId: null },
  { id: 104, kanjiId: 35, language: 'ko', story: '가로선과 세로선이 교차한 십자 모양입니다. 열 손가락을 교차시킨 형태입니다. 플러스 기호와도 비슷합니다.', isDefault: true, authorId: null },
  { id: 105, kanjiId: 35, language: 'en', story: 'A simple cross — like a plus sign (+). Cross all ten fingers together and you get this shape. Ten.', isDefault: true, authorId: null },

  // 出 (exit/come out) - kanjiId: 36
  { id: 106, kanjiId: 36, language: 'ja', story: '山が二つ重なった形。山から山へ出ていく＝外に出ることを表します。', isDefault: true, authorId: null },
  { id: 107, kanjiId: 36, language: 'ko', story: '산 두 개가 겹쳐진 모양입니다. 산에서 산으로 나가는 것 = 밖으로 나가는 것을 나타냅니다.', isDefault: true, authorId: null },
  { id: 108, kanjiId: 36, language: 'en', story: 'Two mountains stacked — a sprout pushing up through the earth, coming out into the world. Exit, emerge, go out.', isDefault: true, authorId: null },

  // 女 (woman) - kanjiId: 37
  { id: 109, kanjiId: 37, language: 'ja', story: 'ひざまずいて両手を交差させた女性の姿。優雅にお辞儀をしている女性です。', isDefault: true, authorId: null },
  { id: 110, kanjiId: 37, language: 'ko', story: '무릎을 꿇고 양손을 교차한 여성의 모습입니다. 우아하게 인사하고 있는 여성입니다.', isDefault: true, authorId: null },
  { id: 111, kanjiId: 37, language: 'en', story: 'A person kneeling with arms gracefully crossed — an elegant woman bowing with poise and beauty.', isDefault: true, authorId: null },

  // 小 (small) - kanjiId: 38
  { id: 112, kanjiId: 38, language: 'ja', story: '真ん中の縦線から両側に小さな点が飛んでいる。物を小さく砕いた破片が散る様子です。', isDefault: true, authorId: null },
  { id: 113, kanjiId: 38, language: 'ko', story: '가운데 세로선에서 양쪽으로 작은 점이 흩어지고 있습니다. 물건을 작게 부순 조각이 흩어지는 모습입니다.', isDefault: true, authorId: null },
  { id: 114, kanjiId: 38, language: 'en', story: 'A vertical line with two tiny dots on each side — something being divided into smaller and smaller pieces. Small, little.', isDefault: true, authorId: null },

  // 上 (above/up) - kanjiId: 39
  { id: 115, kanjiId: 39, language: 'ja', story: '横線の上に伸びる縦線と横棒。基準線から上を指し示す形です。「下」の反対です。', isDefault: true, authorId: null },
  { id: 116, kanjiId: 39, language: 'ko', story: '가로선 위로 솟은 세로선과 가로획. 기준선 위를 가리키는 모양입니다. "下"의 반대입니다.', isDefault: true, authorId: null },
  { id: 117, kanjiId: 39, language: 'en', story: 'A line reaching upward from a baseline — like a plant growing up from the ground. Above, up, upper.', isDefault: true, authorId: null },

  // 森 (forest) - kanjiId: 40
  { id: 118, kanjiId: 40, language: 'ja', story: '木が三つ集まると森になります。木＋木＋木＝森！たくさんの木が生い茂る深い森です。', isDefault: true, authorId: null },
  { id: 119, kanjiId: 40, language: 'ko', story: '나무(木)가 세 그루 모이면 숲(森)이 됩니다. 木＋木＋木＝森! 많은 나무가 우거진 깊은 숲입니다.', isDefault: true, authorId: null },
  { id: 120, kanjiId: 40, language: 'en', story: 'Three trees (木) together make a forest (森). One tree on top of two — so many trees you cannot see the sky!', isDefault: true, authorId: null },

  // 人 (person) - kanjiId: 41
  { id: 121, kanjiId: 41, language: 'ja', story: '二本の線が支え合う形。二人が互いに寄りかかっている＝人は助け合って生きる存在です。', isDefault: true, authorId: null },
  { id: 122, kanjiId: 41, language: 'ko', story: '두 획이 서로 기대어 있는 모양입니다. 두 사람이 서로 의지하는 모습 = 사람은 서로 도우며 사는 존재입니다.', isDefault: true, authorId: null },
  { id: 123, kanjiId: 41, language: 'en', story: 'Two strokes leaning on each other — like a person walking with legs apart, or two people supporting each other. Person.', isDefault: true, authorId: null },

  // 水 (water) - kanjiId: 42
  { id: 124, kanjiId: 42, language: 'ja', story: '川の流れを表す象形文字。中央の流れと両側に飛び散る水しぶきが見えます。', isDefault: true, authorId: null },
  { id: 125, kanjiId: 42, language: 'ko', story: '강의 흐름을 나타내는 상형문자입니다. 중앙의 물줄기와 양쪽으로 튀는 물방울이 보입니다.', isDefault: true, authorId: null },
  { id: 126, kanjiId: 42, language: 'en', story: 'A central stream with droplets splashing to the sides — water flowing down a river with spray and ripples.', isDefault: true, authorId: null },

  // 正 (correct) - kanjiId: 43
  { id: 127, kanjiId: 43, language: 'ja', story: '一（目標の線）に向かって止まる（止）。正しい場所でぴたりと止まること＝正しいです。', isDefault: true, authorId: null },
  { id: 128, kanjiId: 43, language: 'ko', story: '一(목표선)을 향해 멈추다(止). 정확한 위치에서 딱 멈추는 것 = 바르다(正)입니다.', isDefault: true, authorId: null },
  { id: 129, kanjiId: 43, language: 'en', story: 'Stop (止) at the line (一) — stopping exactly at the right mark means you are correct and proper.', isDefault: true, authorId: null },

  // 生 (life/birth) - kanjiId: 44
  { id: 130, kanjiId: 44, language: 'ja', story: '土の上から草が生えてくる形。大地から新しい命が芽を出す＝生きる、生まれるです。', isDefault: true, authorId: null },
  { id: 131, kanjiId: 44, language: 'ko', story: '흙 위에서 풀이 자라나는 모양입니다. 대지에서 새 생명이 싹을 틔우는 것 = 살다, 태어나다입니다.', isDefault: true, authorId: null },
  { id: 132, kanjiId: 44, language: 'en', story: 'A plant sprouting from the ground — new life pushing up through the soil. Life, birth, and vitality.', isDefault: true, authorId: null },

  // 青 (blue/green) - kanjiId: 45
  { id: 133, kanjiId: 45, language: 'ja', story: '上の部分は生（草が生える）、下は月（月光）。月明かりに照らされた草原の青い色です。', isDefault: true, authorId: null },
  { id: 134, kanjiId: 45, language: 'ko', story: '윗부분은 生(풀이 자라다), 아래는 月(달빛). 달빛에 비친 초원의 푸른 색입니다.', isDefault: true, authorId: null },
  { id: 135, kanjiId: 45, language: 'en', story: 'Growth (生) above the moon (月). Grass growing under moonlight has a blue-green glow — the color of nature at twilight.', isDefault: true, authorId: null },

  // 夕 (evening) - kanjiId: 46
  { id: 136, kanjiId: 46, language: 'ja', story: '月の半分の形。月がまだ完全に出ていない時間＝夕方です。半月が空に浮かぶ姿。', isDefault: true, authorId: null },
  { id: 137, kanjiId: 46, language: 'ko', story: '달의 절반 모양입니다. 달이 아직 완전히 뜨지 않은 시간 = 저녁입니다. 반달이 하늘에 떠 있는 모습.', isDefault: true, authorId: null },
  { id: 138, kanjiId: 46, language: 'en', story: 'Half of the moon character (月) — the moon is just appearing at dusk. Only half visible means it is evening time.', isDefault: true, authorId: null },

  // 石 (stone) - kanjiId: 47
  { id: 139, kanjiId: 47, language: 'ja', story: '崖（厂）の下に口（石の塊）。崖から転がり落ちた大きな石の形です。', isDefault: true, authorId: null },
  { id: 140, kanjiId: 47, language: 'ko', story: '절벽(厂) 아래에 口(돌덩이). 절벽에서 굴러 떨어진 큰 돌의 모양입니다.', isDefault: true, authorId: null },
  { id: 141, kanjiId: 47, language: 'en', story: 'A cliff (厂) with a block (口) beneath it — a boulder that has fallen from a cliff face. Stone, rock.', isDefault: true, authorId: null },

  // 赤 (red) - kanjiId: 48
  { id: 142, kanjiId: 48, language: 'ja', story: '土の上に大（火が大きく燃える）。大きな炎が土の上で燃える赤い色です。', isDefault: true, authorId: null },
  { id: 143, kanjiId: 48, language: 'ko', story: '흙 위에 大(불이 크게 타오르다). 큰 불꽃이 땅 위에서 타오르는 붉은 색입니다.', isDefault: true, authorId: null },
  { id: 144, kanjiId: 48, language: 'en', story: 'Big (大) fire on the earth (土) — a great bonfire burning on the ground, its flames glowing bright red.', isDefault: true, authorId: null },

  // 千 (thousand) - kanjiId: 49
  { id: 145, kanjiId: 49, language: 'ja', story: '十（十）の上に一本の線。十を百倍すると千になる。大きな数の始まりです。', isDefault: true, authorId: null },
  { id: 146, kanjiId: 49, language: 'ko', story: '十(열) 위에 한 획이 있습니다. 열을 백 번 곱하면 천이 됩니다. 큰 수의 시작입니다.', isDefault: true, authorId: null },
  { id: 147, kanjiId: 49, language: 'en', story: 'Like ten (十) with an extra stroke on top — ten multiplied many times over becomes a thousand. A big number!', isDefault: true, authorId: null },

  // 川 (river) - kanjiId: 50
  { id: 148, kanjiId: 50, language: 'ja', story: '三本の縦線が流れる水を表す。川の流れをそのまま描いた象形文字です。', isDefault: true, authorId: null },
  { id: 149, kanjiId: 50, language: 'ko', story: '세 개의 세로선이 흐르는 물을 나타냅니다. 강의 흐름을 그대로 그린 상형문자입니다.', isDefault: true, authorId: null },
  { id: 150, kanjiId: 50, language: 'en', story: 'Three vertical flowing lines — streams of water running downhill side by side, forming a river.', isDefault: true, authorId: null },

  // 先 (ahead/previous) - kanjiId: 51
  { id: 151, kanjiId: 51, language: 'ja', story: '上は足の形、下は人の足（儿）。足を使って先に行く＝先頭に立つことです。', isDefault: true, authorId: null },
  { id: 152, kanjiId: 51, language: 'ko', story: '위는 발 모양, 아래는 사람의 다리(儿). 발을 사용해 앞서 가는 것 = 선두에 서는 것입니다.', isDefault: true, authorId: null },
  { id: 153, kanjiId: 51, language: 'en', story: 'Feet (止) on top of legs (儿) — walking ahead of others, being first in line. Ahead, previous, tip.', isDefault: true, authorId: null },

  // 早 (early) - kanjiId: 52
  { id: 154, kanjiId: 52, language: 'ja', story: '日（太陽）の上に十字。太陽がまだ十字架のように地平線にかかっている早朝の姿です。', isDefault: true, authorId: null },
  { id: 155, kanjiId: 52, language: 'ko', story: '日(해) 위에 十(십자). 해가 아직 지평선에 걸려 있는 이른 아침의 모습입니다.', isDefault: true, authorId: null },
  { id: 156, kanjiId: 52, language: 'en', story: 'The sun (日) with a cross (十) — the sun is still low on the horizon at dawn, just rising. Early morning.', isDefault: true, authorId: null },

  // 草 (grass) - kanjiId: 53
  { id: 157, kanjiId: 53, language: 'ja', story: 'くさかんむり（艹）の下に早（早い）。春に早く芽を出す植物＝草です。', isDefault: true, authorId: null },
  { id: 158, kanjiId: 53, language: 'ko', story: '초두머리(艹) 아래에 早(이르다). 봄에 일찍 싹을 틔우는 식물 = 풀입니다.', isDefault: true, authorId: null },
  { id: 159, kanjiId: 53, language: 'en', story: 'Grass radical (艹) on top of "early" (早). Grass is the first plant to sprout early in spring.', isDefault: true, authorId: null },

  // 足 (foot/leg) - kanjiId: 54
  { id: 160, kanjiId: 54, language: 'ja', story: '口（膝）の下に足の形。膝から下の脚と足を描いた象形文字です。', isDefault: true, authorId: null },
  { id: 161, kanjiId: 54, language: 'ko', story: '口(무릎) 아래에 발 모양. 무릎 아래의 다리와 발을 그린 상형문자입니다.', isDefault: true, authorId: null },
  { id: 162, kanjiId: 54, language: 'en', story: 'A kneecap (口) on top with a leg and foot below — the whole lower leg from knee to toes. Foot, leg, sufficient.', isDefault: true, authorId: null },

  // 村 (village) - kanjiId: 55
  { id: 163, kanjiId: 55, language: 'ja', story: '木（木偏）と寸（少し）。少しの木が集まった場所＝小さな村です。', isDefault: true, authorId: null },
  { id: 164, kanjiId: 55, language: 'ko', story: '나무(木)와 촌(寸, 조금). 나무가 조금 모인 곳 = 작은 마을입니다.', isDefault: true, authorId: null },
  { id: 165, kanjiId: 55, language: 'en', story: 'Tree (木) plus a small measure (寸). A small community with a few trees — a cozy little village.', isDefault: true, authorId: null },

  // 大 (big) - kanjiId: 56
  { id: 166, kanjiId: 56, language: 'ja', story: '人が両手両足を大きく広げた姿。「こんなに大きい！」と体いっぱいで表現しています。', isDefault: true, authorId: null },
  { id: 167, kanjiId: 56, language: 'ko', story: '사람이 양팔 양다리를 크게 벌린 모습입니다. "이만큼 크다!"라고 온몸으로 표현하고 있습니다.', isDefault: true, authorId: null },
  { id: 168, kanjiId: 56, language: 'en', story: 'A person standing with arms and legs spread wide — stretching out to show how BIG something is!', isDefault: true, authorId: null },

  // 男 (man) - kanjiId: 57
  { id: 169, kanjiId: 57, language: 'ja', story: '田（田んぼ）と力（力仕事）。田んぼで力仕事をする人＝男です。', isDefault: true, authorId: null },
  { id: 170, kanjiId: 57, language: 'ko', story: '田(논)과 力(힘). 논에서 힘든 일을 하는 사람 = 남자입니다.', isDefault: true, authorId: null },
  { id: 171, kanjiId: 57, language: 'en', story: 'A rice field (田) plus strength (力). The one who uses strength to work the rice paddies — a man.', isDefault: true, authorId: null },

  // 竹 (bamboo) - kanjiId: 58
  { id: 172, kanjiId: 58, language: 'ja', story: '二本の竹が並んで生えている象形文字。左右の葉が風に揺れる竹林の姿です。', isDefault: true, authorId: null },
  { id: 173, kanjiId: 58, language: 'ko', story: '두 그루의 대나무가 나란히 자라고 있는 상형문자입니다. 좌우의 잎이 바람에 흔들리는 대나무 숲의 모습입니다.', isDefault: true, authorId: null },
  { id: 174, kanjiId: 58, language: 'en', story: 'Two bamboo stalks side by side with leaves drooping down — a pair of bamboo plants swaying in the breeze.', isDefault: true, authorId: null },

  // 中 (middle) - kanjiId: 59
  { id: 175, kanjiId: 59, language: 'ja', story: '口（箱）の真ん中を縦線が貫いている。箱のど真ん中を串刺しにした形＝中です。', isDefault: true, authorId: null },
  { id: 176, kanjiId: 59, language: 'ko', story: '口(상자) 한가운데를 세로선이 관통하고 있습니다. 상자 정중앙을 꿰뚫은 모양 = 가운데입니다.', isDefault: true, authorId: null },
  { id: 177, kanjiId: 59, language: 'en', story: 'A line piercing right through the center of a box (口) — hitting the bullseye, the exact middle. Center, inside.', isDefault: true, authorId: null },

  // 虫 (insect) - kanjiId: 60
  { id: 178, kanjiId: 60, language: 'ja', story: '頭と体と足を持つ虫を横から見た形。小さな虫が這っている象形文字です。', isDefault: true, authorId: null },
  { id: 179, kanjiId: 60, language: 'ko', story: '머리, 몸통, 다리를 가진 벌레를 옆에서 본 모양입니다. 작은 벌레가 기어가는 상형문자입니다.', isDefault: true, authorId: null },
  { id: 180, kanjiId: 60, language: 'en', story: 'A side view of a bug with a head, body, and legs — a little insect crawling along. The middle looks like its segmented body.', isDefault: true, authorId: null },

  // 町 (town) - kanjiId: 61
  { id: 181, kanjiId: 61, language: 'ja', story: '田（田んぼ）と丁（区画）。田んぼを区画に分けた場所＝町です。', isDefault: true, authorId: null },
  { id: 182, kanjiId: 61, language: 'ko', story: '田(논)과 丁(구획). 논을 구획으로 나눈 곳 = 마을(町)입니다.', isDefault: true, authorId: null },
  { id: 183, kanjiId: 61, language: 'en', story: 'Rice field (田) plus a block/section (丁). Fields divided into blocks and streets — that is a town.', isDefault: true, authorId: null },

  // 天 (heaven/sky) - kanjiId: 62
  { id: 184, kanjiId: 62, language: 'ja', story: '大（人が手を広げた形）の上に一（空）。人の頭の上に広がる空＝天です。', isDefault: true, authorId: null },
  { id: 185, kanjiId: 62, language: 'ko', story: '大(사람이 팔을 벌린 모양) 위에 一(하늘). 사람 머리 위에 펼쳐진 하늘 = 천(天)입니다.', isDefault: true, authorId: null },
  { id: 186, kanjiId: 62, language: 'en', story: 'A person (大) with a line above their head (一). What is above every person? The sky — heaven above us all.', isDefault: true, authorId: null },

  // 田 (rice field) - kanjiId: 63
  { id: 187, kanjiId: 63, language: 'ja', story: '四角い田んぼを上から見た形。あぜ道で十字に区切られた水田の航空写真です。', isDefault: true, authorId: null },
  { id: 188, kanjiId: 63, language: 'ko', story: '네모난 논을 위에서 내려다본 모양입니다. 둑으로 십자 형태로 나뉜 논의 항공 사진입니다.', isDefault: true, authorId: null },
  { id: 189, kanjiId: 63, language: 'en', story: 'A bird\'s eye view of a rice paddy — a square field divided into four sections by paths. A classic rice field.', isDefault: true, authorId: null },

  // 土 (earth/soil) - kanjiId: 64
  { id: 190, kanjiId: 64, language: 'ja', story: '地面（横線）から何かが突き出ている形。土の中から芽が出ようとしている姿です。', isDefault: true, authorId: null },
  { id: 191, kanjiId: 64, language: 'ko', story: '땅(가로선)에서 무언가가 솟아오르는 모양입니다. 흙 속에서 싹이 나오려는 모습입니다.', isDefault: true, authorId: null },
  { id: 192, kanjiId: 64, language: 'en', story: 'A cross rising from the ground line — a mound of earth with something growing out of it. Soil, earth, ground.', isDefault: true, authorId: null },

  // 二 (two) - kanjiId: 65
  { id: 193, kanjiId: 65, language: 'ja', story: '二本の横線。一の上にもう一本足すだけ。シンプルに数えて二本＝二です。', isDefault: true, authorId: null },
  { id: 194, kanjiId: 65, language: 'ko', story: '두 개의 가로선입니다. 一 위에 한 줄을 더하면 됩니다. 단순하게 세어서 두 줄 = 이(二)입니다.', isDefault: true, authorId: null },
  { id: 195, kanjiId: 65, language: 'en', story: 'Two horizontal lines — just add one more line to "one" (一) and you get two. Count the lines: one, two!', isDefault: true, authorId: null },

  // 日 (day/sun) - kanjiId: 66
  { id: 196, kanjiId: 66, language: 'ja', story: '太陽を四角く描いた象形文字。真ん中の線は太陽の中心の光を表しています。', isDefault: true, authorId: null },
  { id: 197, kanjiId: 66, language: 'ko', story: '태양을 네모나게 그린 상형문자입니다. 가운데 선은 태양 중심의 빛을 나타냅니다.', isDefault: true, authorId: null },
  { id: 198, kanjiId: 66, language: 'en', story: 'A square sun with a line through the middle — the bright sun shining in the sky. Day, sun, Japan (land of the rising sun).', isDefault: true, authorId: null },

  // 入 (enter) - kanjiId: 67
  { id: 199, kanjiId: 67, language: 'ja', story: '人に似ているが、線が内側に入り込む形。門の中に足を踏み入れる動作です。', isDefault: true, authorId: null },
  { id: 200, kanjiId: 67, language: 'ko', story: '人과 비슷하지만, 선이 안쪽으로 들어가는 모양입니다. 문 안으로 발을 들여놓는 동작입니다.', isDefault: true, authorId: null },
  { id: 201, kanjiId: 67, language: 'en', story: 'Similar to person (人) but the strokes point inward — like someone ducking to enter through a doorway. Enter, insert.', isDefault: true, authorId: null },

  // 年 (year) - kanjiId: 68
  { id: 202, kanjiId: 68, language: 'ja', story: '稲が実って倒れる姿を表す。稲が実るまでの一年間＝年を表します。', isDefault: true, authorId: null },
  { id: 203, kanjiId: 68, language: 'ko', story: '벼가 익어서 고개를 숙이는 모습을 나타냅니다. 벼가 익을 때까지의 기간 = 한 해(年)를 나타냅니다.', isDefault: true, authorId: null },
  { id: 204, kanjiId: 68, language: 'en', story: 'A rice plant bending under the weight of its grain — one full cycle of growing rice from planting to harvest equals one year.', isDefault: true, authorId: null },

  // 白 (white) - kanjiId: 69
  { id: 205, kanjiId: 69, language: 'ja', story: '日（太陽）の上に光の一筋。太陽の光が白く輝いている姿です。', isDefault: true, authorId: null },
  { id: 206, kanjiId: 69, language: 'ko', story: '日(태양) 위에 빛줄기 하나. 태양 빛이 하얗게 빛나는 모습입니다.', isDefault: true, authorId: null },
  { id: 207, kanjiId: 69, language: 'en', story: 'The sun (日) with a beam of light on top — sunlight so bright it appears pure white. White, blank, pure.', isDefault: true, authorId: null },

  // 八 (eight) - kanjiId: 70
  { id: 208, kanjiId: 70, language: 'ja', story: '左右に開く二本の線。物を二つに分ける形。八は末広がりで縁起がよい数字です。', isDefault: true, authorId: null },
  { id: 209, kanjiId: 70, language: 'ko', story: '좌우로 벌어지는 두 획입니다. 물건을 둘로 나누는 모양입니다. 팔(八)은 점점 넓어져서 길한 숫자입니다.', isDefault: true, authorId: null },
  { id: 210, kanjiId: 70, language: 'en', story: 'Two strokes spreading apart like a V — splitting something in two. Eight is a lucky number because it spreads wide open.', isDefault: true, authorId: null },

  // 百 (hundred) - kanjiId: 71
  { id: 211, kanjiId: 71, language: 'ja', story: '一の下に白。白（しろ）は「たくさん」の意味もあり、一にたくさん＝百です。', isDefault: true, authorId: null },
  { id: 212, kanjiId: 71, language: 'ko', story: '一 아래에 白이 있습니다. 하나(一)에서 시작해서 하얗게 많아지는 것 = 백(百)입니다.', isDefault: true, authorId: null },
  { id: 213, kanjiId: 71, language: 'en', story: 'One (一) on top of white (白). Start with one and multiply until everything turns white with quantity — one hundred.', isDefault: true, authorId: null },

  // 文 (sentence/writing) - kanjiId: 72
  { id: 214, kanjiId: 72, language: 'ja', story: '人の胸に入れ墨の模様がある形。古代の人が体に刻んだ文様＝文字の起源です。', isDefault: true, authorId: null },
  { id: 215, kanjiId: 72, language: 'ko', story: '사람의 가슴에 문신 무늬가 있는 모양입니다. 고대인이 몸에 새긴 문양 = 문자의 기원입니다.', isDefault: true, authorId: null },
  { id: 216, kanjiId: 72, language: 'en', story: 'A person with crossed patterns on their chest — ancient tattoo markings that became the first written symbols. Writing, text.', isDefault: true, authorId: null },

  // 木 (tree) - kanjiId: 73
  { id: 217, kanjiId: 73, language: 'ja', story: '一本の木を正面から見た形。上に枝が広がり、下に根が張っている大きな木です。', isDefault: true, authorId: null },
  { id: 218, kanjiId: 73, language: 'ko', story: '한 그루의 나무를 정면에서 본 모양입니다. 위로 가지가 뻗고, 아래로 뿌리가 뻗은 큰 나무입니다.', isDefault: true, authorId: null },
  { id: 219, kanjiId: 73, language: 'en', story: 'A tree seen from the front — the trunk in the center, branches spreading up and to the sides, roots below. Tree, wood.', isDefault: true, authorId: null },

  // 本 (book/origin) - kanjiId: 74
  { id: 220, kanjiId: 74, language: 'ja', story: '木の根元に横線を一本加えた形。木の根本（もと）＝物事の根本・本です。', isDefault: true, authorId: null },
  { id: 221, kanjiId: 74, language: 'ko', story: '나무(木)의 밑동에 가로선 하나를 더한 모양입니다. 나무의 뿌리 = 사물의 근본, 책(本)입니다.', isDefault: true, authorId: null },
  { id: 222, kanjiId: 74, language: 'en', story: 'A tree (木) with an extra line at the base marking the roots — the root/origin of things. Also means book (the root of knowledge).', isDefault: true, authorId: null },

  // 名 (name) - kanjiId: 75
  { id: 223, kanjiId: 75, language: 'ja', story: '夕（夕方）と口（口）。暗い夕方に口で名前を呼んで誰かを確認する＝名前です。', isDefault: true, authorId: null },
  { id: 224, kanjiId: 75, language: 'ko', story: '夕(저녁)과 口(입). 어두운 저녁에 입으로 이름을 불러 누군가를 확인하는 것 = 이름입니다.', isDefault: true, authorId: null },
  { id: 225, kanjiId: 75, language: 'en', story: 'Evening (夕) plus mouth (口). In the dark evening, you call out someone\'s name with your mouth to identify them.', isDefault: true, authorId: null },

  // 目 (eye) - kanjiId: 76
  { id: 226, kanjiId: 76, language: 'ja', story: '目を横にした象形文字。瞳と白目がはっきり見える、大きく開いた目の形です。', isDefault: true, authorId: null },
  { id: 227, kanjiId: 76, language: 'ko', story: '눈을 옆으로 세운 상형문자입니다. 동공과 흰자위가 뚜렷이 보이는, 크게 뜬 눈 모양입니다.', isDefault: true, authorId: null },
  { id: 228, kanjiId: 76, language: 'en', story: 'An eye turned on its side — you can see the outline, the iris, and the pupil. A wide-open eye staring at you.', isDefault: true, authorId: null },

  // 立 (stand) - kanjiId: 77
  { id: 229, kanjiId: 77, language: 'ja', story: '大地（横線）の上に人が立っている姿。両足でしっかり地面に立つ人の形です。', isDefault: true, authorId: null },
  { id: 230, kanjiId: 77, language: 'ko', story: '대지(가로선) 위에 사람이 서 있는 모습입니다. 두 발로 단단히 땅에 서 있는 사람의 형태입니다.', isDefault: true, authorId: null },
  { id: 231, kanjiId: 77, language: 'en', story: 'A person standing firmly on the ground with feet planted wide — standing tall and upright on a flat surface.', isDefault: true, authorId: null },

  // 力 (power) - kanjiId: 78
  { id: 232, kanjiId: 78, language: 'ja', story: '腕の筋肉を曲げた形。力こぶを見せている腕の象形文字です。', isDefault: true, authorId: null },
  { id: 233, kanjiId: 78, language: 'ko', story: '팔 근육을 구부린 모양입니다. 알통을 보여주는 팔의 상형문자입니다.', isDefault: true, authorId: null },
  { id: 234, kanjiId: 78, language: 'en', story: 'A flexed arm showing its muscle — someone showing off their bicep. Power, strength, force!', isDefault: true, authorId: null },

  // 林 (grove) - kanjiId: 79
  { id: 235, kanjiId: 79, language: 'ja', story: '木が二つ並んだ形。木＋木＝林。森ほど多くないが、木が集まった林です。', isDefault: true, authorId: null },
  { id: 236, kanjiId: 79, language: 'ko', story: '나무 두 그루가 나란히 선 모양입니다. 木＋木＝林. 숲만큼 많지는 않지만, 나무가 모인 수풀입니다.', isDefault: true, authorId: null },
  { id: 237, kanjiId: 79, language: 'en', story: 'Two trees (木) side by side make a grove (林). Not quite a forest yet, but a pleasant cluster of trees.', isDefault: true, authorId: null },

  // 六 (six) - kanjiId: 80
  { id: 238, kanjiId: 80, language: 'ja', story: '亠（屋根）の下に八（八）。屋根の下で八を少し縮めた形が六です。', isDefault: true, authorId: null },
  { id: 239, kanjiId: 80, language: 'ko', story: '亠(지붕) 아래에 八(여덟). 지붕 아래에서 여덟을 조금 줄인 모양이 육(六)입니다.', isDefault: true, authorId: null },
  { id: 240, kanjiId: 80, language: 'en', story: 'A roof (亠) over a figure splitting apart (八). Like six items arranged under a shelter — six things in a cozy space.', isDefault: true, authorId: null },

  // ============================================================
  // Grade 2 Kanji Mnemonics (first 27 kanji × 3 languages = 81 entries)
  // ============================================================

  // 引 (pull) - kanjiId: 81
  { id: 241, kanjiId: 81, language: 'ja', story: '弓（弓）に縦線。弓の弦を引っ張っている形です。弦を引く＝引くです。', isDefault: true, authorId: null },
  { id: 242, kanjiId: 81, language: 'ko', story: '활(弓)에 세로선이 있습니다. 활의 시위를 당기고 있는 모양입니다. 시위를 당기다 = 끌다입니다.', isDefault: true, authorId: null },
  { id: 243, kanjiId: 81, language: 'en', story: 'A bow (弓) with a straight line — pulling back the bowstring. To draw the string is to pull.', isDefault: true, authorId: null },

  // 羽 (feather/wing) - kanjiId: 82
  { id: 244, kanjiId: 82, language: 'ja', story: '鳥の羽を二枚並べた形。左右対称の美しい羽が風に揺れています。', isDefault: true, authorId: null },
  { id: 245, kanjiId: 82, language: 'ko', story: '새의 깃털 두 장을 나란히 놓은 모양입니다. 좌우 대칭의 아름다운 날개가 바람에 흔들리고 있습니다.', isDefault: true, authorId: null },
  { id: 246, kanjiId: 82, language: 'en', story: 'Two feathers placed side by side — a pair of bird wings, symmetrical and ready for flight. Feather, wing.', isDefault: true, authorId: null },

  // 雲 (cloud) - kanjiId: 83
  { id: 247, kanjiId: 83, language: 'ja', story: '雨（雨冠）の下に云。雨を降らせる前の空に浮かぶ雲です。', isDefault: true, authorId: null },
  { id: 248, kanjiId: 83, language: 'ko', story: '雨(비) 아래에 云이 있습니다. 비를 내리기 전 하늘에 떠 있는 구름입니다.', isDefault: true, authorId: null },
  { id: 249, kanjiId: 83, language: 'en', story: 'Rain radical (雨) on top with a swirling shape (云) below — moisture gathering in the sky before it rains. Cloud.', isDefault: true, authorId: null },

  // 園 (garden/park) - kanjiId: 84
  { id: 250, kanjiId: 84, language: 'ja', story: '囗（囲い）の中に袁。塀で囲まれた美しい庭園＝園です。', isDefault: true, authorId: null },
  { id: 251, kanjiId: 84, language: 'ko', story: '囗(울타리) 안에 袁이 있습니다. 담으로 둘러싸인 아름다운 정원 = 동산(園)입니다.', isDefault: true, authorId: null },
  { id: 252, kanjiId: 84, language: 'en', story: 'An enclosure (囗) surrounding a garden inside. A walled-off beautiful space — a garden or park.', isDefault: true, authorId: null },

  // 遠 (far) - kanjiId: 85
  { id: 253, kanjiId: 85, language: 'ja', story: 'しんにょう（歩く）に袁（衣を着た人）。長い旅路を歩く人＝遠い場所へ行くことです。', isDefault: true, authorId: null },
  { id: 254, kanjiId: 85, language: 'ko', story: '쉬엄쉬엄 걷는 모양(辶)에 옷을 입은 사람(袁). 긴 여행길을 걷는 사람 = 먼 곳으로 가는 것입니다.', isDefault: true, authorId: null },
  { id: 255, kanjiId: 85, language: 'en', story: 'The walking radical (辶) with a robed figure. A traveler walking a long road to a distant destination — far away.', isDefault: true, authorId: null },

  // 何 (what) - kanjiId: 86
  { id: 256, kanjiId: 86, language: 'ja', story: '亻（人）と可（できる）。人が「何ができるの？」と尋ねている形＝何です。', isDefault: true, authorId: null },
  { id: 257, kanjiId: 86, language: 'ko', story: '사람(亻)과 可(가능). 사람이 "무엇이 가능한가?"라고 묻고 있는 모양 = 무엇(何)입니다.', isDefault: true, authorId: null },
  { id: 258, kanjiId: 86, language: 'en', story: 'A person (亻) next to "possible" (可). A person asking "what is possible?" — what, which, how many?', isDefault: true, authorId: null },

  // 科 (subject/department) - kanjiId: 87
  { id: 259, kanjiId: 87, language: 'ja', story: '禾（稲）と斗（ます）。穀物を計量して分類する＝科目に分けることです。', isDefault: true, authorId: null },
  { id: 260, kanjiId: 87, language: 'ko', story: '禾(벼)와 斗(말). 곡물을 계량하여 분류하는 것 = 과목으로 나누는 것입니다.', isDefault: true, authorId: null },
  { id: 261, kanjiId: 87, language: 'en', story: 'Grain (禾) plus a measuring ladle (斗). Sorting and measuring grain into categories — a subject, department, or course of study.', isDefault: true, authorId: null },

  // 夏 (summer) - kanjiId: 88
  { id: 262, kanjiId: 88, language: 'ja', story: '頭に大きな帽子をかぶり、足を広げて踊る人。夏祭りで踊っている人の姿です。', isDefault: true, authorId: null },
  { id: 263, kanjiId: 88, language: 'ko', story: '머리에 큰 모자를 쓰고 다리를 벌려 춤추는 사람. 여름 축제에서 춤추는 사람의 모습입니다.', isDefault: true, authorId: null },
  { id: 264, kanjiId: 88, language: 'en', story: 'A person wearing a big hat dancing with legs spread wide — celebrating at a summer festival under the hot sun.', isDefault: true, authorId: null },

  // 家 (house/home) - kanjiId: 89
  { id: 265, kanjiId: 89, language: 'ja', story: '宀（屋根）の下に豕（ぶた）。屋根の下で豚を飼う＝家畜のいる家庭＝家です。', isDefault: true, authorId: null },
  { id: 266, kanjiId: 89, language: 'ko', story: '지붕(宀) 아래에 돼지(豕)가 있습니다. 지붕 아래서 돼지를 키우는 것 = 가축이 있는 가정 = 집입니다.', isDefault: true, authorId: null },
  { id: 267, kanjiId: 89, language: 'en', story: 'A pig (豕) under a roof (宀). In ancient times, keeping a pig under your roof meant you had a home — house, family.', isDefault: true, authorId: null },

  // 歌 (song) - kanjiId: 90
  { id: 268, kanjiId: 90, language: 'ja', story: '可（声を出す）が二つと欠（口を開ける）。口を大きく開けて何度も声を出す＝歌うことです。', isDefault: true, authorId: null },
  { id: 269, kanjiId: 90, language: 'ko', story: '可(소리를 내다)가 두 개와 欠(입을 벌리다). 입을 크게 벌려 여러 번 소리를 내는 것 = 노래하는 것입니다.', isDefault: true, authorId: null },
  { id: 270, kanjiId: 90, language: 'en', story: 'Two sounds (可可) plus an open mouth (欠). Opening your mouth wide to let sounds pour out again and again — singing a song!', isDefault: true, authorId: null },

  // 画 (picture/painting) - kanjiId: 91
  { id: 271, kanjiId: 91, language: 'ja', story: '田（枠）の中に筆で描いた線。額縁の中にある一枚の絵画です。', isDefault: true, authorId: null },
  { id: 272, kanjiId: 91, language: 'ko', story: '田(틀) 안에 붓으로 그린 선. 액자 안에 있는 한 장의 그림입니다.', isDefault: true, authorId: null },
  { id: 273, kanjiId: 91, language: 'en', story: 'A frame with brushstrokes inside — like a painting hanging in a frame on the wall. Picture, painting, stroke.', isDefault: true, authorId: null },

  // 回 (revolve/times) - kanjiId: 92
  { id: 274, kanjiId: 92, language: 'ja', story: '囗（外側の輪）の中にもう一つの口。渦のように回転する形＝回るです。', isDefault: true, authorId: null },
  { id: 275, kanjiId: 92, language: 'ko', story: '囗(바깥쪽 고리) 안에 또 하나의 口. 소용돌이처럼 회전하는 모양 = 돌다입니다.', isDefault: true, authorId: null },
  { id: 276, kanjiId: 92, language: 'en', story: 'A box inside a box — like a spinning wheel or a whirlpool going around and around. Revolve, turn, times.', isDefault: true, authorId: null },

  // 会 (meet/meeting) - kanjiId: 93
  { id: 277, kanjiId: 93, language: 'ja', story: '人が屋根の下に集まる形。人々が一か所に会して話し合う＝会議・会うです。', isDefault: true, authorId: null },
  { id: 278, kanjiId: 93, language: 'ko', story: '사람들이 지붕 아래 모이는 모양입니다. 사람들이 한곳에 모여 이야기하는 것 = 모임, 만나다입니다.', isDefault: true, authorId: null },
  { id: 279, kanjiId: 93, language: 'en', story: 'People gathering under a roof — coming together in one place to meet and talk. Meeting, association.', isDefault: true, authorId: null },

  // 海 (sea/ocean) - kanjiId: 94
  { id: 280, kanjiId: 94, language: 'ja', story: 'さんずい（水）に毎（毎日）。毎日波が打ち寄せる広大な水の場所＝海です。', isDefault: true, authorId: null },
  { id: 281, kanjiId: 94, language: 'ko', story: '삼수변(水)에 每(매일). 매일 파도가 밀려오는 광활한 물의 장소 = 바다입니다.', isDefault: true, authorId: null },
  { id: 282, kanjiId: 94, language: 'en', story: 'Water (氵) plus "every" (毎). Every day the waves roll in — the vast, ever-moving body of water is the sea.', isDefault: true, authorId: null },

  // 絵 (picture/drawing) - kanjiId: 95
  { id: 283, kanjiId: 95, language: 'ja', story: '糸（糸偏）と会（会う）。色とりどりの糸が出会って織りなす美しい絵です。', isDefault: true, authorId: null },
  { id: 284, kanjiId: 95, language: 'ko', story: '실(糸)과 會(만나다). 다양한 색의 실이 만나 엮어내는 아름다운 그림입니다.', isDefault: true, authorId: null },
  { id: 285, kanjiId: 95, language: 'en', story: 'Thread (糸) meets together (会). Colorful threads woven together create a beautiful picture — a drawing or painting.', isDefault: true, authorId: null },

  // 外 (outside) - kanjiId: 96
  { id: 286, kanjiId: 96, language: 'ja', story: '夕（夕方）と卜（占い）。夕方に外で占いをする＝外にいることです。', isDefault: true, authorId: null },
  { id: 287, kanjiId: 96, language: 'ko', story: '夕(저녁)과 卜(점). 저녁에 밖에서 점을 치는 것 = 바깥에 있는 것입니다.', isDefault: true, authorId: null },
  { id: 288, kanjiId: 96, language: 'en', story: 'Evening (夕) plus divination (卜). Fortune-telling was done outside at dusk — outside, external.', isDefault: true, authorId: null },

  // 角 (angle/corner/horn) - kanjiId: 97
  { id: 289, kanjiId: 97, language: 'ja', story: '動物の角を描いた象形文字。鹿や牛の頭から突き出た角の形です。', isDefault: true, authorId: null },
  { id: 290, kanjiId: 97, language: 'ko', story: '동물의 뿔을 그린 상형문자입니다. 사슴이나 소의 머리에서 솟아난 뿔 모양입니다.', isDefault: true, authorId: null },
  { id: 291, kanjiId: 97, language: 'en', story: 'A pictograph of an animal horn — the pointed horn of a deer or ox, which also forms a sharp angle or corner.', isDefault: true, authorId: null },

  // 楽 (fun/pleasure/music) - kanjiId: 98
  { id: 292, kanjiId: 98, language: 'ja', story: '白（白い糸）と木（木の楽器）。木の楽器に白い糸を張って音楽を楽しむ形です。', isDefault: true, authorId: null },
  { id: 293, kanjiId: 98, language: 'ko', story: '白(흰 실)과 木(나무 악기). 나무 악기에 흰 실을 매어 음악을 즐기는 모양입니다.', isDefault: true, authorId: null },
  { id: 294, kanjiId: 98, language: 'en', story: 'White strings on a wooden instrument — a harp or lute with silk strings on a wooden frame. Music brings pleasure and fun!', isDefault: true, authorId: null },

  // 活 (life/lively/active) - kanjiId: 99
  { id: 295, kanjiId: 99, language: 'ja', story: 'さんずい（水）と舌（舌）。水を舌で味わえる＝生き生きと活動できる＝活です。', isDefault: true, authorId: null },
  { id: 296, kanjiId: 99, language: 'ko', story: '삼수변(水)과 舌(혀). 물을 혀로 맛볼 수 있다 = 생생하게 활동할 수 있다 = 활(活)입니다.', isDefault: true, authorId: null },
  { id: 297, kanjiId: 99, language: 'en', story: 'Water (氵) plus tongue (舌). Where there is water to drink, life thrives — lively, active, alive!', isDefault: true, authorId: null },

  // 間 (interval/between) - kanjiId: 100
  { id: 298, kanjiId: 100, language: 'ja', story: '門（もん）の間から日（太陽）が見える。門の隙間から光が差し込む＝間です。', isDefault: true, authorId: null },
  { id: 299, kanjiId: 100, language: 'ko', story: '門(문) 사이로 日(해)이 보입니다. 문 틈새로 빛이 들어오는 것 = 사이(間)입니다.', isDefault: true, authorId: null },
  { id: 300, kanjiId: 100, language: 'en', story: 'Sunlight (日) peeking through a gate (門). Light shining through the gap between doors — the space between, interval.', isDefault: true, authorId: null },

  // 丸 (round/circle) - kanjiId: 101
  { id: 301, kanjiId: 101, language: 'ja', story: '九に点を加えた形。丸い物を手で転がしている姿。ころころと丸い形です。', isDefault: true, authorId: null },
  { id: 302, kanjiId: 101, language: 'ko', story: '九에 점을 더한 모양입니다. 둥근 물건을 손으로 굴리고 있는 모습. 데구르르 둥근 형태입니다.', isDefault: true, authorId: null },
  { id: 303, kanjiId: 101, language: 'en', story: 'Like nine (九) with a gentle curve and a dot — something rolling smoothly in a circle. Round, circular.', isDefault: true, authorId: null },

  // 岩 (rock/boulder) - kanjiId: 102
  { id: 304, kanjiId: 102, language: 'ja', story: '山の上に石。山の頂上にある巨大な岩の形です。山＋石＝岩！', isDefault: true, authorId: null },
  { id: 305, kanjiId: 102, language: 'ko', story: '산(山) 위에 돌(石). 산꼭대기에 있는 거대한 바위 모양입니다. 山＋石＝岩!', isDefault: true, authorId: null },
  { id: 306, kanjiId: 102, language: 'en', story: 'Mountain (山) plus stone (石). A massive stone sitting atop a mountain — a boulder or crag. Mountain + stone = rock!', isDefault: true, authorId: null },

  // 顔 (face) - kanjiId: 103
  { id: 307, kanjiId: 103, language: 'ja', story: '彦（美しい男）と頁（頭・ページ）。美しい頭の正面＝顔です。', isDefault: true, authorId: null },
  { id: 308, kanjiId: 103, language: 'ko', story: '彦(아름다운 남자)과 頁(머리, 페이지). 아름다운 머리의 정면 = 얼굴입니다.', isDefault: true, authorId: null },
  { id: 309, kanjiId: 103, language: 'en', story: 'A handsome figure (彦) plus head/page (頁). The front of your head that everyone sees — your face and expression.', isDefault: true, authorId: null },

  // 汽 (steam) - kanjiId: 104
  { id: 310, kanjiId: 104, language: 'ja', story: 'さんずい（水）と気（気体）。水が気体になる＝蒸気＝汽です。汽車の汽！', isDefault: true, authorId: null },
  { id: 311, kanjiId: 104, language: 'ko', story: '삼수변(水)과 气(기체). 물이 기체가 되는 것 = 증기 = 汽입니다. 기차의 汽!', isDefault: true, authorId: null },
  { id: 312, kanjiId: 104, language: 'en', story: 'Water (氵) turning into air/gas (气). Water becoming gas — steam! Like the steam that powers a steam train.', isDefault: true, authorId: null },

  // 記 (record/write down) - kanjiId: 105
  { id: 313, kanjiId: 105, language: 'ja', story: '言（言葉）と己（自分）。自分の言葉を書き残す＝記録するです。', isDefault: true, authorId: null },
  { id: 314, kanjiId: 105, language: 'ko', story: '言(말)과 己(자기). 자기의 말을 써서 남기다 = 기록하다입니다.', isDefault: true, authorId: null },
  { id: 315, kanjiId: 105, language: 'en', story: 'Words (言) plus self (己). Writing down your own words for later — to record, note, and remember.', isDefault: true, authorId: null },

  // 帰 (return/go home) - kanjiId: 106
  { id: 316, kanjiId: 106, language: 'ja', story: '刀とほうきの形。刀を置いてほうきを手に取る＝戦いを終えて家に帰ることです。', isDefault: true, authorId: null },
  { id: 317, kanjiId: 106, language: 'ko', story: '칼과 빗자루 모양. 칼을 내려놓고 빗자루를 드는 것 = 싸움을 끝내고 집에 돌아가는 것입니다.', isDefault: true, authorId: null },
  { id: 318, kanjiId: 106, language: 'en', story: 'A soldier putting down his sword and picking up a broom — the war is over, time to return home and sweep the house.', isDefault: true, authorId: null },

  // 弓 (bow) - kanjiId: 107 (27th grade 2 kanji)
  { id: 319, kanjiId: 107, language: 'ja', story: '弓を横から見た象形文字。弦を張った弓の美しいカーブが見えます。', isDefault: true, authorId: null },
  { id: 320, kanjiId: 107, language: 'ko', story: '활을 옆에서 본 상형문자입니다. 시위를 매단 활의 아름다운 곡선이 보입니다.', isDefault: true, authorId: null },
  { id: 321, kanjiId: 107, language: 'en', story: 'A side view of a bow with its string — the elegant curve of a drawn bow, ready to shoot an arrow.', isDefault: true, authorId: null },
];
