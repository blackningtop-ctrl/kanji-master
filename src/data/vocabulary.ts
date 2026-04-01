import { VocabularyData } from '../types/kanji';

export const VOCABULARY_DATA: VocabularyData[] = [
  // ===== Grade 1 Kanji Vocabulary =====

  // 一 (id: 1)
  { id: 1, kanjiId: 1, word: '一人', reading: 'ひとり', meaning: '一人の人', meaningKo: '한 사람, 혼자', meaningEn: 'one person, alone', exampleSentence: '一人で学校に行きます。', exampleMeaning: '혼자서 학교에 갑니다.', furigana: null, jlptLevel: 5 },
  { id: 2, kanjiId: 1, word: '一つ', reading: 'ひとつ', meaning: '数の一', meaningKo: '하나', meaningEn: 'one (thing)', exampleSentence: 'りんごを一つください。', exampleMeaning: '사과 하나 주세요.', furigana: null, jlptLevel: 5 },
  { id: 3, kanjiId: 1, word: '一日', reading: 'いちにち', meaning: '一日の間', meaningKo: '하루', meaningEn: 'one day', exampleSentence: '一日中、雨が降りました。', exampleMeaning: '하루 종일 비가 내렸습니다.', furigana: null, jlptLevel: 5 },
  { id: 4, kanjiId: 1, word: '一月', reading: 'いちがつ', meaning: '年の最初の月', meaningKo: '1월', meaningEn: 'January', exampleSentence: '一月は寒いです。', exampleMeaning: '1월은 춥습니다.', furigana: null, jlptLevel: 5 },

  // 右 (id: 2)
  { id: 5, kanjiId: 2, word: '右手', reading: 'みぎて', meaning: '右の手', meaningKo: '오른손', meaningEn: 'right hand', exampleSentence: '右手で字を書きます。', exampleMeaning: '오른손으로 글자를 씁니다.', furigana: null, jlptLevel: 5 },
  { id: 6, kanjiId: 2, word: '右側', reading: 'みぎがわ', meaning: '右のほう', meaningKo: '오른쪽', meaningEn: 'right side', exampleSentence: '右側を歩いてください。', exampleMeaning: '오른쪽으로 걸어 주세요.', furigana: null, jlptLevel: 4 },
  { id: 7, kanjiId: 2, word: '左右', reading: 'さゆう', meaning: '左と右', meaningKo: '좌우', meaningEn: 'left and right', exampleSentence: '左右を見てから道を渡ります。', exampleMeaning: '좌우를 보고 나서 길을 건넙니다.', furigana: null, jlptLevel: 4 },

  // 雨 (id: 3)
  { id: 8, kanjiId: 3, word: '大雨', reading: 'おおあめ', meaning: 'たくさんの雨', meaningKo: '폭우, 큰비', meaningEn: 'heavy rain', exampleSentence: '大雨で川の水が増えました。', exampleMeaning: '폭우로 강물이 불어났습니다.', furigana: null, jlptLevel: 4 },
  { id: 9, kanjiId: 3, word: '雨天', reading: 'うてん', meaning: '雨の天気', meaningKo: '우천', meaningEn: 'rainy weather', exampleSentence: '雨天の場合は中止です。', exampleMeaning: '우천인 경우 중지입니다.', furigana: null, jlptLevel: 4 },
  { id: 10, kanjiId: 3, word: '小雨', reading: 'こさめ', meaning: '少しの雨', meaningKo: '가랑비, 이슬비', meaningEn: 'light rain, drizzle', exampleSentence: '小雨が降っています。', exampleMeaning: '이슬비가 내리고 있습니다.', furigana: null, jlptLevel: 4 },

  // 円 (id: 4)
  { id: 11, kanjiId: 4, word: '百円', reading: 'ひゃくえん', meaning: '百の円', meaningKo: '백 엔', meaningEn: '100 yen', exampleSentence: 'これは百円です。', exampleMeaning: '이것은 백 엔입니다.', furigana: null, jlptLevel: 5 },
  { id: 12, kanjiId: 4, word: '千円', reading: 'せんえん', meaning: '千の円', meaningKo: '천 엔', meaningEn: '1000 yen', exampleSentence: '千円を払いました。', exampleMeaning: '천 엔을 냈습니다.', furigana: null, jlptLevel: 5 },
  { id: 13, kanjiId: 4, word: '円形', reading: 'えんけい', meaning: '丸い形', meaningKo: '원형', meaningEn: 'circular shape', exampleSentence: '円形のテーブルがあります。', exampleMeaning: '원형 테이블이 있습니다.', furigana: null, jlptLevel: 4 },

  // 王 (id: 5)
  { id: 14, kanjiId: 5, word: '王様', reading: 'おうさま', meaning: '国の王', meaningKo: '왕, 임금님', meaningEn: 'king', exampleSentence: '王様はお城に住んでいます。', exampleMeaning: '왕은 성에 살고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 15, kanjiId: 5, word: '女王', reading: 'じょおう', meaning: '女の王', meaningKo: '여왕', meaningEn: 'queen', exampleSentence: '女王は美しい人です。', exampleMeaning: '여왕은 아름다운 사람입니다.', furigana: null, jlptLevel: 4 },
  { id: 16, kanjiId: 5, word: '王子', reading: 'おうじ', meaning: '王の子', meaningKo: '왕자', meaningEn: 'prince', exampleSentence: '王子は馬に乗りました。', exampleMeaning: '왕자는 말을 탔습니다.', furigana: null, jlptLevel: 4 },

  // 音 (id: 6)
  { id: 17, kanjiId: 6, word: '音楽', reading: 'おんがく', meaning: '楽しい音', meaningKo: '음악', meaningEn: 'music', exampleSentence: '音楽を聞くのが好きです。', exampleMeaning: '음악을 듣는 것을 좋아합니다.', furigana: null, jlptLevel: 5 },
  { id: 18, kanjiId: 6, word: '発音', reading: 'はつおん', meaning: '音を出すこと', meaningKo: '발음', meaningEn: 'pronunciation', exampleSentence: '日本語の発音は難しいです。', exampleMeaning: '일본어 발음은 어렵습니다.', furigana: null, jlptLevel: 4 },
  { id: 19, kanjiId: 6, word: '足音', reading: 'あしおと', meaning: '足の音', meaningKo: '발소리', meaningEn: 'footsteps', exampleSentence: '足音が聞こえました。', exampleMeaning: '발소리가 들렸습니다.', furigana: null, jlptLevel: 4 },

  // 下 (id: 7)
  { id: 20, kanjiId: 7, word: '下手', reading: 'へた', meaning: '上手でない', meaningKo: '서투른, 못하는', meaningEn: 'unskillful, poor at', exampleSentence: '歌が下手です。', exampleMeaning: '노래를 못합니다.', furigana: null, jlptLevel: 5 },
  { id: 21, kanjiId: 7, word: '地下', reading: 'ちか', meaning: '地面の下', meaningKo: '지하', meaningEn: 'underground', exampleSentence: '地下鉄で学校に行きます。', exampleMeaning: '지하철로 학교에 갑니다.', furigana: null, jlptLevel: 5 },
  { id: 22, kanjiId: 7, word: '下着', reading: 'したぎ', meaning: '下に着る服', meaningKo: '속옷', meaningEn: 'underwear', exampleSentence: '下着を洗いました。', exampleMeaning: '속옷을 빨았습니다.', furigana: null, jlptLevel: 4 },

  // 火 (id: 8)
  { id: 23, kanjiId: 8, word: '火曜日', reading: 'かようび', meaning: '週の三番目の日', meaningKo: '화요일', meaningEn: 'Tuesday', exampleSentence: '火曜日にテストがあります。', exampleMeaning: '화요일에 시험이 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 24, kanjiId: 8, word: '火事', reading: 'かじ', meaning: '火が燃えること', meaningKo: '화재', meaningEn: 'fire (disaster)', exampleSentence: '火事に気をつけてください。', exampleMeaning: '화재에 주의하세요.', furigana: null, jlptLevel: 4 },
  { id: 25, kanjiId: 8, word: '花火', reading: 'はなび', meaning: '夜空の花のような火', meaningKo: '불꽃놀이', meaningEn: 'fireworks', exampleSentence: '夏に花火を見ました。', exampleMeaning: '여름에 불꽃놀이를 봤습니다.', furigana: null, jlptLevel: 4 },

  // 花 (id: 9)
  { id: 26, kanjiId: 9, word: '花見', reading: 'はなみ', meaning: '花を見ること', meaningKo: '꽃구경', meaningEn: 'cherry blossom viewing', exampleSentence: '春に花見をします。', exampleMeaning: '봄에 꽃구경을 합니다.', furigana: null, jlptLevel: 4 },
  { id: 27, kanjiId: 9, word: '生花', reading: 'いけばな', meaning: '花を生けること', meaningKo: '꽃꽂이', meaningEn: 'flower arrangement', exampleSentence: '生花を習っています。', exampleMeaning: '꽃꽂이를 배우고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 28, kanjiId: 9, word: '花束', reading: 'はなたば', meaning: '花をまとめたもの', meaningKo: '꽃다발', meaningEn: 'bouquet', exampleSentence: '母に花束をあげました。', exampleMeaning: '어머니께 꽃다발을 드렸습니다.', furigana: null, jlptLevel: 4 },

  // 貝 (id: 10)
  { id: 29, kanjiId: 10, word: '貝殻', reading: 'かいがら', meaning: '貝の殻', meaningKo: '조개껍데기', meaningEn: 'seashell', exampleSentence: '海で貝殻を拾いました。', exampleMeaning: '바다에서 조개껍데기를 주웠습니다.', furigana: null, jlptLevel: 4 },
  { id: 30, kanjiId: 10, word: '二枚貝', reading: 'にまいがい', meaning: '二枚の殻を持つ貝', meaningKo: '이매패(조개)', meaningEn: 'bivalve', exampleSentence: '二枚貝を見つけました。', exampleMeaning: '이매패를 찾았습니다.', furigana: null, jlptLevel: null },
  { id: 31, kanjiId: 10, word: '巻貝', reading: 'まきがい', meaning: '巻いた形の貝', meaningKo: '소라, 고둥', meaningEn: 'spiral shell', exampleSentence: '巻貝はきれいな形です。', exampleMeaning: '소라는 예쁜 모양입니다.', furigana: null, jlptLevel: null },

  // 学 (id: 11)
  { id: 32, kanjiId: 11, word: '学校', reading: 'がっこう', meaning: '勉強する所', meaningKo: '학교', meaningEn: 'school', exampleSentence: '毎日学校に行きます。', exampleMeaning: '매일 학교에 갑니다.', furigana: null, jlptLevel: 5 },
  { id: 33, kanjiId: 11, word: '学生', reading: 'がくせい', meaning: '学ぶ人', meaningKo: '학생', meaningEn: 'student', exampleSentence: '私は学生です。', exampleMeaning: '저는 학생입니다.', furigana: null, jlptLevel: 5 },
  { id: 34, kanjiId: 11, word: '大学', reading: 'だいがく', meaning: '大きな学校', meaningKo: '대학교', meaningEn: 'university', exampleSentence: '兄は大学に通っています。', exampleMeaning: '형은 대학교에 다니고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 35, kanjiId: 11, word: '入学', reading: 'にゅうがく', meaning: '学校に入ること', meaningKo: '입학', meaningEn: 'enrollment', exampleSentence: '四月に入学します。', exampleMeaning: '4월에 입학합니다.', furigana: null, jlptLevel: 4 },

  // 気 (id: 12)
  { id: 36, kanjiId: 12, word: '天気', reading: 'てんき', meaning: '空のようす', meaningKo: '날씨', meaningEn: 'weather', exampleSentence: '今日は天気がいいです。', exampleMeaning: '오늘은 날씨가 좋습니다.', furigana: null, jlptLevel: 5 },
  { id: 37, kanjiId: 12, word: '元気', reading: 'げんき', meaning: '体が丈夫なこと', meaningKo: '건강, 원기', meaningEn: 'healthy, energetic', exampleSentence: 'お元気ですか。', exampleMeaning: '건강하세요?', furigana: null, jlptLevel: 5 },
  { id: 38, kanjiId: 12, word: '人気', reading: 'にんき', meaning: '人に好かれること', meaningKo: '인기', meaningEn: 'popularity', exampleSentence: 'この店は人気があります。', exampleMeaning: '이 가게는 인기가 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 39, kanjiId: 12, word: '空気', reading: 'くうき', meaning: '空の気', meaningKo: '공기', meaningEn: 'air, atmosphere', exampleSentence: '山の空気はおいしいです。', exampleMeaning: '산의 공기는 맑습니다.', furigana: null, jlptLevel: 4 },

  // 九 (id: 13)
  { id: 40, kanjiId: 13, word: '九月', reading: 'くがつ', meaning: '年の九番目の月', meaningKo: '9월', meaningEn: 'September', exampleSentence: '九月から学校が始まります。', exampleMeaning: '9월부터 학교가 시작됩니다.', furigana: null, jlptLevel: 5 },
  { id: 41, kanjiId: 13, word: '九つ', reading: 'ここのつ', meaning: '数の九', meaningKo: '아홉', meaningEn: 'nine (things)', exampleSentence: 'ボールが九つあります。', exampleMeaning: '공이 아홉 개 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 42, kanjiId: 13, word: '九日', reading: 'ここのか', meaning: '月の九番目の日', meaningKo: '9일', meaningEn: 'ninth day', exampleSentence: '九日に会いましょう。', exampleMeaning: '9일에 만납시다.', furigana: null, jlptLevel: 5 },

  // 休 (id: 14)
  { id: 43, kanjiId: 14, word: '休日', reading: 'きゅうじつ', meaning: '休みの日', meaningKo: '휴일', meaningEn: 'holiday, day off', exampleSentence: '休日に映画を見ます。', exampleMeaning: '휴일에 영화를 봅니다.', furigana: null, jlptLevel: 4 },
  { id: 44, kanjiId: 14, word: '休憩', reading: 'きゅうけい', meaning: '少し休むこと', meaningKo: '휴식, 쉬는 시간', meaningEn: 'break, rest', exampleSentence: '十分間の休憩があります。', exampleMeaning: '10분간의 휴식이 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 45, kanjiId: 14, word: '夏休み', reading: 'なつやすみ', meaning: '夏の休み', meaningKo: '여름방학', meaningEn: 'summer vacation', exampleSentence: '夏休みに海に行きます。', exampleMeaning: '여름방학에 바다에 갑니다.', furigana: null, jlptLevel: 5 },

  // 玉 (id: 15)
  { id: 46, kanjiId: 15, word: '玉ねぎ', reading: 'たまねぎ', meaning: '丸い野菜', meaningKo: '양파', meaningEn: 'onion', exampleSentence: '玉ねぎを切りました。', exampleMeaning: '양파를 잘랐습니다.', furigana: null, jlptLevel: 4 },
  { id: 47, kanjiId: 15, word: '目玉', reading: 'めだま', meaning: '目の玉', meaningKo: '눈알', meaningEn: 'eyeball', exampleSentence: '目玉が大きい魚です。', exampleMeaning: '눈알이 큰 물고기입니다.', furigana: null, jlptLevel: 4 },
  { id: 48, kanjiId: 15, word: '玉入れ', reading: 'たまいれ', meaning: '玉を入れるゲーム', meaningKo: '옥 넣기 (운동회 놀이)', meaningEn: 'ball-toss game', exampleSentence: '運動会で玉入れをしました。', exampleMeaning: '운동회에서 옥 넣기를 했습니다.', furigana: null, jlptLevel: null },

  // 金 (id: 16)
  { id: 49, kanjiId: 16, word: '金曜日', reading: 'きんようび', meaning: '週の六番目の日', meaningKo: '금요일', meaningEn: 'Friday', exampleSentence: '金曜日が好きです。', exampleMeaning: '금요일을 좋아합니다.', furigana: null, jlptLevel: 5 },
  { id: 50, kanjiId: 16, word: 'お金', reading: 'おかね', meaning: '使うお金', meaningKo: '돈', meaningEn: 'money', exampleSentence: 'お金を貯めています。', exampleMeaning: '돈을 모으고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 51, kanjiId: 16, word: '金色', reading: 'きんいろ', meaning: '金の色', meaningKo: '금색', meaningEn: 'golden color', exampleSentence: '金色の魚がいます。', exampleMeaning: '금색 물고기가 있습니다.', furigana: null, jlptLevel: 4 },

  // 空 (id: 17)
  { id: 52, kanjiId: 17, word: '空気', reading: 'くうき', meaning: '空の気', meaningKo: '공기', meaningEn: 'air', exampleSentence: '新鮮な空気を吸いましょう。', exampleMeaning: '신선한 공기를 마시자.', furigana: null, jlptLevel: 4 },
  { id: 53, kanjiId: 17, word: '青空', reading: 'あおぞら', meaning: '青い空', meaningKo: '파란 하늘', meaningEn: 'blue sky', exampleSentence: '青空がきれいです。', exampleMeaning: '파란 하늘이 아름답습니다.', furigana: null, jlptLevel: 4 },
  { id: 54, kanjiId: 17, word: '空港', reading: 'くうこう', meaning: '飛行機が来る所', meaningKo: '공항', meaningEn: 'airport', exampleSentence: '空港まで車で行きます。', exampleMeaning: '공항까지 차로 갑니다.', furigana: null, jlptLevel: 4 },

  // 月 (id: 18)
  { id: 55, kanjiId: 18, word: '月曜日', reading: 'げつようび', meaning: '週の二番目の日', meaningKo: '월요일', meaningEn: 'Monday', exampleSentence: '月曜日は忙しいです。', exampleMeaning: '월요일은 바쁩니다.', furigana: null, jlptLevel: 5 },
  { id: 56, kanjiId: 18, word: '今月', reading: 'こんげつ', meaning: 'この月', meaningKo: '이번 달', meaningEn: 'this month', exampleSentence: '今月は三月です。', exampleMeaning: '이번 달은 3월입니다.', furigana: null, jlptLevel: 5 },
  { id: 57, kanjiId: 18, word: '毎月', reading: 'まいつき', meaning: 'どの月も', meaningKo: '매달', meaningEn: 'every month', exampleSentence: '毎月本を読みます。', exampleMeaning: '매달 책을 읽습니다.', furigana: null, jlptLevel: 5 },

  // 犬 (id: 19)
  { id: 58, kanjiId: 19, word: '子犬', reading: 'こいぬ', meaning: '小さい犬', meaningKo: '강아지', meaningEn: 'puppy', exampleSentence: '子犬がかわいいです。', exampleMeaning: '강아지가 귀엽습니다.', furigana: null, jlptLevel: 4 },
  { id: 59, kanjiId: 19, word: '犬小屋', reading: 'いぬごや', meaning: '犬の家', meaningKo: '개집', meaningEn: 'doghouse', exampleSentence: '犬小屋を作りました。', exampleMeaning: '개집을 만들었습니다.', furigana: null, jlptLevel: null },
  { id: 60, kanjiId: 19, word: '番犬', reading: 'ばんけん', meaning: '家を守る犬', meaningKo: '경비견', meaningEn: 'watchdog', exampleSentence: '番犬が吠えています。', exampleMeaning: '경비견이 짖고 있습니다.', furigana: null, jlptLevel: null },

  // 見 (id: 20)
  { id: 61, kanjiId: 20, word: '見物', reading: 'けんぶつ', meaning: '見て楽しむこと', meaningKo: '구경', meaningEn: 'sightseeing', exampleSentence: '京都を見物しました。', exampleMeaning: '교토를 구경했습니다.', furigana: null, jlptLevel: 4 },
  { id: 62, kanjiId: 20, word: '意見', reading: 'いけん', meaning: '考えたこと', meaningKo: '의견', meaningEn: 'opinion', exampleSentence: '意見を聞かせてください。', exampleMeaning: '의견을 들려주세요.', furigana: null, jlptLevel: 4 },
  { id: 63, kanjiId: 20, word: '花見', reading: 'はなみ', meaning: '桜を見ること', meaningKo: '꽃구경', meaningEn: 'flower viewing', exampleSentence: '花見に行きませんか。', exampleMeaning: '꽃구경 가지 않을래요?', furigana: null, jlptLevel: 4 },

  // 五 (id: 21)
  { id: 64, kanjiId: 21, word: '五月', reading: 'ごがつ', meaning: '年の五番目の月', meaningKo: '5월', meaningEn: 'May', exampleSentence: '五月は暖かいです。', exampleMeaning: '5월은 따뜻합니다.', furigana: null, jlptLevel: 5 },
  { id: 65, kanjiId: 21, word: '五つ', reading: 'いつつ', meaning: '数の五', meaningKo: '다섯', meaningEn: 'five (things)', exampleSentence: '卵が五つあります。', exampleMeaning: '달걀이 다섯 개 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 66, kanjiId: 21, word: '五日', reading: 'いつか', meaning: '月の五番目の日', meaningKo: '5일', meaningEn: 'fifth day', exampleSentence: '五日に会議があります。', exampleMeaning: '5일에 회의가 있습니다.', furigana: null, jlptLevel: 5 },

  // 口 (id: 22)
  { id: 67, kanjiId: 22, word: '入口', reading: 'いりぐち', meaning: '入る所', meaningKo: '입구', meaningEn: 'entrance', exampleSentence: '入口はこちらです。', exampleMeaning: '입구는 이쪽입니다.', furigana: null, jlptLevel: 5 },
  { id: 68, kanjiId: 22, word: '出口', reading: 'でぐち', meaning: '出る所', meaningKo: '출구', meaningEn: 'exit', exampleSentence: '出口はあちらです。', exampleMeaning: '출구는 저쪽입니다.', furigana: null, jlptLevel: 5 },
  { id: 69, kanjiId: 22, word: '人口', reading: 'じんこう', meaning: '人の数', meaningKo: '인구', meaningEn: 'population', exampleSentence: '日本の人口は多いです。', exampleMeaning: '일본의 인구는 많습니다.', furigana: null, jlptLevel: 4 },

  // 校 (id: 23)
  { id: 70, kanjiId: 23, word: '学校', reading: 'がっこう', meaning: '勉強する所', meaningKo: '학교', meaningEn: 'school', exampleSentence: '学校は八時に始まります。', exampleMeaning: '학교는 8시에 시작합니다.', furigana: null, jlptLevel: 5 },
  { id: 71, kanjiId: 23, word: '校長', reading: 'こうちょう', meaning: '学校の長', meaningKo: '교장', meaningEn: 'principal', exampleSentence: '校長先生が話をしました。', exampleMeaning: '교장 선생님이 이야기를 했습니다.', furigana: null, jlptLevel: 4 },
  { id: 72, kanjiId: 23, word: '校庭', reading: 'こうてい', meaning: '学校の庭', meaningKo: '교정, 운동장', meaningEn: 'schoolyard', exampleSentence: '校庭で遊びます。', exampleMeaning: '운동장에서 놉니다.', furigana: null, jlptLevel: 4 },

  // 左 (id: 24)
  { id: 73, kanjiId: 24, word: '左手', reading: 'ひだりて', meaning: '左の手', meaningKo: '왼손', meaningEn: 'left hand', exampleSentence: '左手で箸を使います。', exampleMeaning: '왼손으로 젓가락을 사용합니다.', furigana: null, jlptLevel: 5 },
  { id: 74, kanjiId: 24, word: '左右', reading: 'さゆう', meaning: '左と右', meaningKo: '좌우', meaningEn: 'left and right', exampleSentence: '左右をよく見てください。', exampleMeaning: '좌우를 잘 보세요.', furigana: null, jlptLevel: 4 },
  { id: 75, kanjiId: 24, word: '左側', reading: 'ひだりがわ', meaning: '左のほう', meaningKo: '왼쪽', meaningEn: 'left side', exampleSentence: '左側に曲がってください。', exampleMeaning: '왼쪽으로 꺾어 주세요.', furigana: null, jlptLevel: 4 },

  // 三 (id: 25)
  { id: 76, kanjiId: 25, word: '三月', reading: 'さんがつ', meaning: '年の三番目の月', meaningKo: '3월', meaningEn: 'March', exampleSentence: '三月に卒業します。', exampleMeaning: '3월에 졸업합니다.', furigana: null, jlptLevel: 5 },
  { id: 77, kanjiId: 25, word: '三つ', reading: 'みっつ', meaning: '数の三', meaningKo: '셋', meaningEn: 'three (things)', exampleSentence: 'みかんが三つあります。', exampleMeaning: '귤이 세 개 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 78, kanjiId: 25, word: '三角', reading: 'さんかく', meaning: '三つの角', meaningKo: '삼각형', meaningEn: 'triangle', exampleSentence: '三角の形を書きました。', exampleMeaning: '삼각형을 그렸습니다.', furigana: null, jlptLevel: 4 },

  // 山 (id: 26)
  { id: 79, kanjiId: 26, word: '山登り', reading: 'やまのぼり', meaning: '山に登ること', meaningKo: '등산', meaningEn: 'mountain climbing', exampleSentence: '日曜日に山登りをします。', exampleMeaning: '일요일에 등산을 합니다.', furigana: null, jlptLevel: 4 },
  { id: 80, kanjiId: 26, word: '火山', reading: 'かざん', meaning: '火を出す山', meaningKo: '화산', meaningEn: 'volcano', exampleSentence: '日本には火山がたくさんあります。', exampleMeaning: '일본에는 화산이 많습니다.', furigana: null, jlptLevel: 4 },
  { id: 81, kanjiId: 26, word: '富士山', reading: 'ふじさん', meaning: '日本で一番高い山', meaningKo: '후지산', meaningEn: 'Mt. Fuji', exampleSentence: '富士山はとても美しいです。', exampleMeaning: '후지산은 매우 아름답습니다.', furigana: null, jlptLevel: 4 },

  // 子 (id: 27)
  { id: 82, kanjiId: 27, word: '子供', reading: 'こども', meaning: '小さい人', meaningKo: '어린이, 아이', meaningEn: 'child', exampleSentence: '子供が公園で遊んでいます。', exampleMeaning: '아이가 공원에서 놀고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 83, kanjiId: 27, word: '男の子', reading: 'おとこのこ', meaning: '男の子供', meaningKo: '남자아이', meaningEn: 'boy', exampleSentence: '男の子がサッカーをしています。', exampleMeaning: '남자아이가 축구를 하고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 84, kanjiId: 27, word: '女の子', reading: 'おんなのこ', meaning: '女の子供', meaningKo: '여자아이', meaningEn: 'girl', exampleSentence: '女の子が本を読んでいます。', exampleMeaning: '여자아이가 책을 읽고 있습니다.', furigana: null, jlptLevel: 5 },

  // 四 (id: 28)
  { id: 85, kanjiId: 28, word: '四月', reading: 'しがつ', meaning: '年の四番目の月', meaningKo: '4월', meaningEn: 'April', exampleSentence: '四月に学校が始まります。', exampleMeaning: '4월에 학교가 시작합니다.', furigana: null, jlptLevel: 5 },
  { id: 86, kanjiId: 28, word: '四つ', reading: 'よっつ', meaning: '数の四', meaningKo: '넷', meaningEn: 'four (things)', exampleSentence: 'いすが四つあります。', exampleMeaning: '의자가 네 개 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 87, kanjiId: 28, word: '四季', reading: 'しき', meaning: '四つの季節', meaningKo: '사계절', meaningEn: 'four seasons', exampleSentence: '日本には四季があります。', exampleMeaning: '일본에는 사계절이 있습니다.', furigana: null, jlptLevel: 4 },

  // 糸 (id: 29)
  { id: 88, kanjiId: 29, word: '糸口', reading: 'いとぐち', meaning: '始まりの所', meaningKo: '실마리', meaningEn: 'clue, beginning', exampleSentence: '問題の糸口が見つかりました。', exampleMeaning: '문제의 실마리를 찾았습니다.', furigana: null, jlptLevel: null },
  { id: 89, kanjiId: 29, word: '毛糸', reading: 'けいと', meaning: '毛で作った糸', meaningKo: '모직 실, 털실', meaningEn: 'yarn, wool thread', exampleSentence: '毛糸でマフラーを編みました。', exampleMeaning: '털실로 목도리를 떴습니다.', furigana: null, jlptLevel: 4 },
  { id: 90, kanjiId: 29, word: '一本の糸', reading: 'いっぽんのいと', meaning: '一つの糸', meaningKo: '실 한 가닥', meaningEn: 'a single thread', exampleSentence: '一本の糸で人形を作りました。', exampleMeaning: '실 한 가닥으로 인형을 만들었습니다.', furigana: null, jlptLevel: null },

  // 字 (id: 30)
  { id: 91, kanjiId: 30, word: '文字', reading: 'もじ', meaning: '書いた字', meaningKo: '문자, 글자', meaningEn: 'character, letter', exampleSentence: '文字が小さくて読めません。', exampleMeaning: '글자가 작아서 읽을 수 없습니다.', furigana: null, jlptLevel: 4 },
  { id: 92, kanjiId: 30, word: '漢字', reading: 'かんじ', meaning: '中国から来た字', meaningKo: '한자', meaningEn: 'kanji, Chinese character', exampleSentence: '漢字を毎日練習します。', exampleMeaning: '한자를 매일 연습합니다.', furigana: null, jlptLevel: 5 },
  { id: 93, kanjiId: 30, word: '数字', reading: 'すうじ', meaning: '数を表す字', meaningKo: '숫자', meaningEn: 'number, numeral', exampleSentence: '数字を書いてください。', exampleMeaning: '숫자를 써 주세요.', furigana: null, jlptLevel: 4 },

  // 耳 (id: 31)
  { id: 94, kanjiId: 31, word: '耳鳴り', reading: 'みみなり', meaning: '耳の中で音がすること', meaningKo: '이명', meaningEn: 'tinnitus, ringing in ears', exampleSentence: '耳鳴りがします。', exampleMeaning: '이명이 있습니다.', furigana: null, jlptLevel: null },
  { id: 95, kanjiId: 31, word: '早耳', reading: 'はやみみ', meaning: '早く聞くこと', meaningKo: '소문을 빨리 듣는 것', meaningEn: 'sharp ears, quick to hear news', exampleSentence: '彼は早耳ですね。', exampleMeaning: '그는 소문을 빨리 듣네요.', furigana: null, jlptLevel: null },
  { id: 96, kanjiId: 31, word: '耳元', reading: 'みみもと', meaning: '耳のそば', meaningKo: '귀 근처', meaningEn: 'near one\'s ear', exampleSentence: '耳元で話しました。', exampleMeaning: '귀 근처에서 이야기했습니다.', furigana: null, jlptLevel: null },

  // 七 (id: 32)
  { id: 97, kanjiId: 32, word: '七月', reading: 'しちがつ', meaning: '年の七番目の月', meaningKo: '7월', meaningEn: 'July', exampleSentence: '七月は暑いです。', exampleMeaning: '7월은 덥습니다.', furigana: null, jlptLevel: 5 },
  { id: 98, kanjiId: 32, word: '七つ', reading: 'ななつ', meaning: '数の七', meaningKo: '일곱', meaningEn: 'seven (things)', exampleSentence: '星が七つ見えます。', exampleMeaning: '별이 일곱 개 보입니다.', furigana: null, jlptLevel: 5 },
  { id: 99, kanjiId: 32, word: '七夕', reading: 'たなばた', meaning: '七月七日の祭り', meaningKo: '칠석', meaningEn: 'Star Festival', exampleSentence: '七夕に願い事をしました。', exampleMeaning: '칠석에 소원을 빌었습니다.', furigana: null, jlptLevel: 4 },

  // 車 (id: 33)
  { id: 100, kanjiId: 33, word: '自動車', reading: 'じどうしゃ', meaning: '自分で動く車', meaningKo: '자동차', meaningEn: 'automobile', exampleSentence: '自動車で旅行します。', exampleMeaning: '자동차로 여행합니다.', furigana: null, jlptLevel: 4 },
  { id: 101, kanjiId: 33, word: '電車', reading: 'でんしゃ', meaning: '電気で動く車', meaningKo: '전차, 전철', meaningEn: 'train', exampleSentence: '電車で会社に行きます。', exampleMeaning: '전철로 회사에 갑니다.', furigana: null, jlptLevel: 5 },
  { id: 102, kanjiId: 33, word: '自転車', reading: 'じてんしゃ', meaning: '自分で転がす車', meaningKo: '자전거', meaningEn: 'bicycle', exampleSentence: '自転車に乗ります。', exampleMeaning: '자전거를 탑니다.', furigana: null, jlptLevel: 5 },

  // 手 (id: 34)
  { id: 103, kanjiId: 34, word: '上手', reading: 'じょうず', meaning: '良くできる', meaningKo: '잘하는, 능숙한', meaningEn: 'skillful, good at', exampleSentence: '彼女は料理が上手です。', exampleMeaning: '그녀는 요리를 잘합니다.', furigana: null, jlptLevel: 5 },
  { id: 104, kanjiId: 34, word: '手紙', reading: 'てがみ', meaning: '書いた紙', meaningKo: '편지', meaningEn: 'letter', exampleSentence: '友達に手紙を書きました。', exampleMeaning: '친구에게 편지를 썼습니다.', furigana: null, jlptLevel: 5 },
  { id: 105, kanjiId: 34, word: '選手', reading: 'せんしゅ', meaning: '選ばれた人', meaningKo: '선수', meaningEn: 'player, athlete', exampleSentence: 'あの選手は有名です。', exampleMeaning: '그 선수는 유명합니다.', furigana: null, jlptLevel: 4 },

  // 十 (id: 35)
  { id: 106, kanjiId: 35, word: '十分', reading: 'じゅうぶん', meaning: '足りている', meaningKo: '충분한', meaningEn: 'enough, sufficient', exampleSentence: '時間は十分あります。', exampleMeaning: '시간은 충분히 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 107, kanjiId: 35, word: '十月', reading: 'じゅうがつ', meaning: '年の十番目の月', meaningKo: '10월', meaningEn: 'October', exampleSentence: '十月は秋です。', exampleMeaning: '10월은 가을입니다.', furigana: null, jlptLevel: 5 },
  { id: 108, kanjiId: 35, word: '十日', reading: 'とおか', meaning: '月の十番目の日', meaningKo: '10일', meaningEn: 'tenth day', exampleSentence: '十日に出発します。', exampleMeaning: '10일에 출발합니다.', furigana: null, jlptLevel: 5 },

  // 出 (id: 36)
  { id: 109, kanjiId: 36, word: '出口', reading: 'でぐち', meaning: '出る所', meaningKo: '출구', meaningEn: 'exit', exampleSentence: '出口は右にあります。', exampleMeaning: '출구는 오른쪽에 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 110, kanjiId: 36, word: '出発', reading: 'しゅっぱつ', meaning: '出て行くこと', meaningKo: '출발', meaningEn: 'departure', exampleSentence: '朝早く出発します。', exampleMeaning: '아침 일찍 출발합니다.', furigana: null, jlptLevel: 4 },
  { id: 111, kanjiId: 36, word: '外出', reading: 'がいしゅつ', meaning: '外に出ること', meaningKo: '외출', meaningEn: 'going out', exampleSentence: '今日は外出しません。', exampleMeaning: '오늘은 외출하지 않습니다.', furigana: null, jlptLevel: 4 },

  // 女 (id: 37)
  { id: 112, kanjiId: 37, word: '女性', reading: 'じょせい', meaning: '女の人', meaningKo: '여성', meaningEn: 'woman, female', exampleSentence: 'あの女性は先生です。', exampleMeaning: '저 여성은 선생님입니다.', furigana: null, jlptLevel: 4 },
  { id: 113, kanjiId: 37, word: '女子', reading: 'じょし', meaning: '女の子', meaningKo: '여자, 여학생', meaningEn: 'girl, female student', exampleSentence: '女子トイレはあちらです。', exampleMeaning: '여자 화장실은 저쪽입니다.', furigana: null, jlptLevel: 4 },
  { id: 114, kanjiId: 37, word: '長女', reading: 'ちょうじょ', meaning: '一番上の女の子', meaningKo: '장녀', meaningEn: 'eldest daughter', exampleSentence: '長女は中学生です。', exampleMeaning: '장녀는 중학생입니다.', furigana: null, jlptLevel: 4 },

  // 小 (id: 38)
  { id: 115, kanjiId: 38, word: '小学校', reading: 'しょうがっこう', meaning: '小さい子の学校', meaningKo: '초등학교', meaningEn: 'elementary school', exampleSentence: '小学校に通っています。', exampleMeaning: '초등학교에 다니고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 116, kanjiId: 38, word: '小さい', reading: 'ちいさい', meaning: 'サイズが小さい', meaningKo: '작은', meaningEn: 'small', exampleSentence: '小さい犬がいます。', exampleMeaning: '작은 개가 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 117, kanjiId: 38, word: '小説', reading: 'しょうせつ', meaning: '物語の本', meaningKo: '소설', meaningEn: 'novel', exampleSentence: '小説を読むのが好きです。', exampleMeaning: '소설 읽는 것을 좋아합니다.', furigana: null, jlptLevel: 4 },

  // 上 (id: 39)
  { id: 118, kanjiId: 39, word: '上手', reading: 'じょうず', meaning: '良くできる', meaningKo: '잘하는', meaningEn: 'skillful', exampleSentence: '日本語が上手ですね。', exampleMeaning: '일본어를 잘하시네요.', furigana: null, jlptLevel: 5 },
  { id: 119, kanjiId: 39, word: '以上', reading: 'いじょう', meaning: 'それより多い', meaningKo: '이상', meaningEn: 'more than, above', exampleSentence: '十人以上来ました。', exampleMeaning: '열 명 이상 왔습니다.', furigana: null, jlptLevel: 4 },
  { id: 120, kanjiId: 39, word: '屋上', reading: 'おくじょう', meaning: '建物の上', meaningKo: '옥상', meaningEn: 'rooftop', exampleSentence: '屋上から景色を見ました。', exampleMeaning: '옥상에서 경치를 봤습니다.', furigana: null, jlptLevel: 4 },

  // 森 (id: 40)
  { id: 121, kanjiId: 40, word: '森林', reading: 'しんりん', meaning: '大きな森', meaningKo: '삼림, 숲', meaningEn: 'forest', exampleSentence: '森林を守ることは大切です。', exampleMeaning: '삼림을 지키는 것은 중요합니다.', furigana: null, jlptLevel: 4 },
  { id: 122, kanjiId: 40, word: '森の中', reading: 'もりのなか', meaning: '森の中', meaningKo: '숲 속', meaningEn: 'inside the forest', exampleSentence: '森の中を歩きました。', exampleMeaning: '숲 속을 걸었습니다.', furigana: null, jlptLevel: 5 },
  { id: 123, kanjiId: 40, word: '青森', reading: 'あおもり', meaning: '日本の県', meaningKo: '아오모리', meaningEn: 'Aomori (place)', exampleSentence: '青森はりんごが有名です。', exampleMeaning: '아오모리는 사과로 유명합니다.', furigana: null, jlptLevel: null },

  // 人 (id: 41)
  { id: 124, kanjiId: 41, word: '日本人', reading: 'にほんじん', meaning: '日本の人', meaningKo: '일본인', meaningEn: 'Japanese person', exampleSentence: '私は日本人です。', exampleMeaning: '저는 일본인입니다.', furigana: null, jlptLevel: 5 },
  { id: 125, kanjiId: 41, word: '大人', reading: 'おとな', meaning: '大きくなった人', meaningKo: '어른', meaningEn: 'adult', exampleSentence: '大人の切符を二枚ください。', exampleMeaning: '어른 표 두 장 주세요.', furigana: null, jlptLevel: 5 },
  { id: 126, kanjiId: 41, word: '友人', reading: 'ゆうじん', meaning: '友だち', meaningKo: '친구', meaningEn: 'friend', exampleSentence: '友人と食事をしました。', exampleMeaning: '친구와 식사를 했습니다.', furigana: null, jlptLevel: 4 },

  // 水 (id: 42)
  { id: 127, kanjiId: 42, word: '水曜日', reading: 'すいようび', meaning: '週の四番目の日', meaningKo: '수요일', meaningEn: 'Wednesday', exampleSentence: '水曜日に会いましょう。', exampleMeaning: '수요일에 만납시다.', furigana: null, jlptLevel: 5 },
  { id: 128, kanjiId: 42, word: 'お水', reading: 'おみず', meaning: '飲む水', meaningKo: '물', meaningEn: 'water', exampleSentence: 'お水をください。', exampleMeaning: '물을 주세요.', furigana: null, jlptLevel: 5 },
  { id: 129, kanjiId: 42, word: '水泳', reading: 'すいえい', meaning: '水の中を泳ぐこと', meaningKo: '수영', meaningEn: 'swimming', exampleSentence: '水泳が得意です。', exampleMeaning: '수영을 잘합니다.', furigana: null, jlptLevel: 4 },

  // 正 (id: 43)
  { id: 130, kanjiId: 43, word: '正月', reading: 'しょうがつ', meaning: '年の初めの月', meaningKo: '정월, 새해', meaningEn: 'New Year', exampleSentence: '正月に家族で集まります。', exampleMeaning: '정월에 가족끼리 모입니다.', furigana: null, jlptLevel: 4 },
  { id: 131, kanjiId: 43, word: '正しい', reading: 'ただしい', meaning: '間違いがない', meaningKo: '올바른, 맞는', meaningEn: 'correct, right', exampleSentence: '正しい答えを選んでください。', exampleMeaning: '올바른 답을 고르세요.', furigana: null, jlptLevel: 4 },
  { id: 132, kanjiId: 43, word: '正門', reading: 'せいもん', meaning: '正面の門', meaningKo: '정문', meaningEn: 'main gate', exampleSentence: '正門の前で待ちます。', exampleMeaning: '정문 앞에서 기다립니다.', furigana: null, jlptLevel: 4 },

  // 生 (id: 44)
  { id: 133, kanjiId: 44, word: '先生', reading: 'せんせい', meaning: '教える人', meaningKo: '선생님', meaningEn: 'teacher', exampleSentence: '先生は優しいです。', exampleMeaning: '선생님은 자상합니다.', furigana: null, jlptLevel: 5 },
  { id: 134, kanjiId: 44, word: '生活', reading: 'せいかつ', meaning: '生きること', meaningKo: '생활', meaningEn: 'life, living', exampleSentence: '日本での生活は楽しいです。', exampleMeaning: '일본에서의 생활은 즐겁습니다.', furigana: null, jlptLevel: 4 },
  { id: 135, kanjiId: 44, word: '誕生日', reading: 'たんじょうび', meaning: '生まれた日', meaningKo: '생일', meaningEn: 'birthday', exampleSentence: '明日は誕生日です。', exampleMeaning: '내일은 생일입니다.', furigana: null, jlptLevel: 5 },

  // 青 (id: 45)
  { id: 136, kanjiId: 45, word: '青空', reading: 'あおぞら', meaning: '青い空', meaningKo: '푸른 하늘', meaningEn: 'blue sky', exampleSentence: '今日は青空が広がっています。', exampleMeaning: '오늘은 푸른 하늘이 펼쳐져 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 137, kanjiId: 45, word: '青年', reading: 'せいねん', meaning: '若い人', meaningKo: '청년', meaningEn: 'youth, young person', exampleSentence: '青年がボランティアをしています。', exampleMeaning: '청년이 봉사활동을 하고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 138, kanjiId: 45, word: '青信号', reading: 'あおしんごう', meaning: '進んでいい信号', meaningKo: '파란 신호등', meaningEn: 'green light (traffic)', exampleSentence: '青信号になったら渡ります。', exampleMeaning: '파란 신호등이 되면 건넙니다.', furigana: null, jlptLevel: 4 },

  // 夕 (id: 46)
  { id: 139, kanjiId: 46, word: '夕方', reading: 'ゆうがた', meaning: '日が沈む頃', meaningKo: '저녁때', meaningEn: 'evening', exampleSentence: '夕方に散歩をします。', exampleMeaning: '저녁때 산책을 합니다.', furigana: null, jlptLevel: 5 },
  { id: 140, kanjiId: 46, word: '夕食', reading: 'ゆうしょく', meaning: '夕方のごはん', meaningKo: '저녁 식사', meaningEn: 'dinner, supper', exampleSentence: '夕食を作りましょう。', exampleMeaning: '저녁 식사를 만듭시다.', furigana: null, jlptLevel: 4 },
  { id: 141, kanjiId: 46, word: '夕日', reading: 'ゆうひ', meaning: '沈む太陽', meaningKo: '석양, 노을', meaningEn: 'sunset', exampleSentence: '夕日がきれいです。', exampleMeaning: '석양이 아름답습니다.', furigana: null, jlptLevel: 4 },

  // 石 (id: 47)
  { id: 142, kanjiId: 47, word: '石橋', reading: 'いしばし', meaning: '石で作った橋', meaningKo: '돌다리', meaningEn: 'stone bridge', exampleSentence: '古い石橋を渡りました。', exampleMeaning: '오래된 돌다리를 건넜습니다.', furigana: null, jlptLevel: null },
  { id: 143, kanjiId: 47, word: '宝石', reading: 'ほうせき', meaning: 'きれいな石', meaningKo: '보석', meaningEn: 'jewel, gem', exampleSentence: '宝石がキラキラ光っています。', exampleMeaning: '보석이 반짝반짝 빛나고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 144, kanjiId: 47, word: '岩石', reading: 'がんせき', meaning: '大きな石', meaningKo: '암석', meaningEn: 'rock, boulder', exampleSentence: '山に大きな岩石がありました。', exampleMeaning: '산에 큰 암석이 있었습니다.', furigana: null, jlptLevel: null },

  // 赤 (id: 48)
  { id: 145, kanjiId: 48, word: '赤ちゃん', reading: 'あかちゃん', meaning: '小さい子', meaningKo: '아기', meaningEn: 'baby', exampleSentence: '赤ちゃんが泣いています。', exampleMeaning: '아기가 울고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 146, kanjiId: 48, word: '赤色', reading: 'あかいろ', meaning: '赤い色', meaningKo: '빨간색', meaningEn: 'red color', exampleSentence: '赤色の花が咲いています。', exampleMeaning: '빨간색 꽃이 피어 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 147, kanjiId: 48, word: '赤道', reading: 'せきどう', meaning: '地球の真ん中の線', meaningKo: '적도', meaningEn: 'equator', exampleSentence: '赤道に近い国は暑いです。', exampleMeaning: '적도에 가까운 나라는 덥습니다.', furigana: null, jlptLevel: null },

  // 千 (id: 49)
  { id: 148, kanjiId: 49, word: '千円', reading: 'せんえん', meaning: '千の円', meaningKo: '천 엔', meaningEn: '1000 yen', exampleSentence: '千円札を出しました。', exampleMeaning: '천 엔짜리를 냈습니다.', furigana: null, jlptLevel: 5 },
  { id: 149, kanjiId: 49, word: '三千', reading: 'さんぜん', meaning: '千の三倍', meaningKo: '삼천', meaningEn: 'three thousand', exampleSentence: 'この本は三千円です。', exampleMeaning: '이 책은 삼천 엔입니다.', furigana: null, jlptLevel: 5 },
  { id: 150, kanjiId: 49, word: '千葉', reading: 'ちば', meaning: '日本の県', meaningKo: '치바', meaningEn: 'Chiba (place)', exampleSentence: '千葉に住んでいます。', exampleMeaning: '치바에 살고 있습니다.', furigana: null, jlptLevel: null },

  // 川 (id: 50)
  { id: 151, kanjiId: 50, word: '小川', reading: 'おがわ', meaning: '小さい川', meaningKo: '개울, 시냇물', meaningEn: 'stream, brook', exampleSentence: '小川で魚を捕まえました。', exampleMeaning: '개울에서 물고기를 잡았습니다.', furigana: null, jlptLevel: 4 },
  { id: 152, kanjiId: 50, word: '川上', reading: 'かわかみ', meaning: '川の上のほう', meaningKo: '상류', meaningEn: 'upstream', exampleSentence: '川上から水が流れてきます。', exampleMeaning: '상류에서 물이 흘러옵니다.', furigana: null, jlptLevel: null },
  { id: 153, kanjiId: 50, word: '河川', reading: 'かせん', meaning: '大きな川', meaningKo: '하천', meaningEn: 'river', exampleSentence: '河川の水質を調べます。', exampleMeaning: '하천의 수질을 조사합니다.', furigana: null, jlptLevel: null },

  // 先 (id: 51)
  { id: 154, kanjiId: 51, word: '先生', reading: 'せんせい', meaning: '教える人', meaningKo: '선생님', meaningEn: 'teacher', exampleSentence: '先生に質問しました。', exampleMeaning: '선생님께 질문했습니다.', furigana: null, jlptLevel: 5 },
  { id: 155, kanjiId: 51, word: '先週', reading: 'せんしゅう', meaning: '前の週', meaningKo: '지난주', meaningEn: 'last week', exampleSentence: '先週は忙しかったです。', exampleMeaning: '지난주는 바빴습니다.', furigana: null, jlptLevel: 5 },
  { id: 156, kanjiId: 51, word: '先月', reading: 'せんげつ', meaning: '前の月', meaningKo: '지난달', meaningEn: 'last month', exampleSentence: '先月、旅行に行きました。', exampleMeaning: '지난달, 여행을 갔습니다.', furigana: null, jlptLevel: 5 },

  // 早 (id: 52)
  { id: 157, kanjiId: 52, word: '早朝', reading: 'そうちょう', meaning: '朝早い時間', meaningKo: '이른 아침', meaningEn: 'early morning', exampleSentence: '早朝に起きて走ります。', exampleMeaning: '이른 아침에 일어나서 달립니다.', furigana: null, jlptLevel: 4 },
  { id: 158, kanjiId: 52, word: '早起き', reading: 'はやおき', meaning: '早く起きること', meaningKo: '일찍 일어남', meaningEn: 'early rising', exampleSentence: '早起きは体にいいです。', exampleMeaning: '일찍 일어나는 것은 몸에 좋습니다.', furigana: null, jlptLevel: 4 },
  { id: 159, kanjiId: 52, word: '早口', reading: 'はやくち', meaning: '話すのが速い', meaningKo: '빠른 말', meaningEn: 'fast talking', exampleSentence: '早口で話さないでください。', exampleMeaning: '빨리 말하지 마세요.', furigana: null, jlptLevel: null },

  // 草 (id: 53)
  { id: 160, kanjiId: 53, word: '草花', reading: 'くさばな', meaning: '草と花', meaningKo: '풀꽃', meaningEn: 'plants and flowers', exampleSentence: '庭に草花を植えました。', exampleMeaning: '정원에 풀꽃을 심었습니다.', furigana: null, jlptLevel: null },
  { id: 161, kanjiId: 53, word: '雑草', reading: 'ざっそう', meaning: '要らない草', meaningKo: '잡초', meaningEn: 'weeds', exampleSentence: '庭の雑草を取りました。', exampleMeaning: '정원의 잡초를 뽑았습니다.', furigana: null, jlptLevel: null },
  { id: 162, kanjiId: 53, word: '草原', reading: 'そうげん', meaning: '草の広い所', meaningKo: '초원', meaningEn: 'grassland, meadow', exampleSentence: '広い草原を走りました。', exampleMeaning: '넓은 초원을 달렸습니다.', furigana: null, jlptLevel: null },

  // 足 (id: 54)
  { id: 163, kanjiId: 54, word: '足りる', reading: 'たりる', meaning: '十分にある', meaningKo: '충분하다, 족하다', meaningEn: 'to be sufficient', exampleSentence: 'お金が足りません。', exampleMeaning: '돈이 부족합니다.', furigana: null, jlptLevel: 5 },
  { id: 164, kanjiId: 54, word: '遠足', reading: 'えんそく', meaning: '遠くへ歩くこと', meaningKo: '소풍', meaningEn: 'field trip, excursion', exampleSentence: '遠足で山に行きました。', exampleMeaning: '소풍으로 산에 갔습니다.', furigana: null, jlptLevel: 4 },
  { id: 165, kanjiId: 54, word: '不足', reading: 'ふそく', meaning: '足りないこと', meaningKo: '부족', meaningEn: 'shortage, lack', exampleSentence: '睡眠不足で眠いです。', exampleMeaning: '수면 부족으로 졸립니다.', furigana: null, jlptLevel: 4 },

  // 村 (id: 55)
  { id: 166, kanjiId: 55, word: '村長', reading: 'そんちょう', meaning: '村の長', meaningKo: '촌장', meaningEn: 'village chief', exampleSentence: '村長さんが来ました。', exampleMeaning: '촌장님이 왔습니다.', furigana: null, jlptLevel: null },
  { id: 167, kanjiId: 55, word: '村人', reading: 'むらびと', meaning: '村に住む人', meaningKo: '마을 사람', meaningEn: 'villager', exampleSentence: '村人が集まりました。', exampleMeaning: '마을 사람들이 모였습니다.', furigana: null, jlptLevel: null },
  { id: 168, kanjiId: 55, word: '農村', reading: 'のうそん', meaning: '農業をする村', meaningKo: '농촌', meaningEn: 'farming village', exampleSentence: '農村で米を作っています。', exampleMeaning: '농촌에서 쌀을 만들고 있습니다.', furigana: null, jlptLevel: null },

  // 大 (id: 56)
  { id: 169, kanjiId: 56, word: '大きい', reading: 'おおきい', meaning: 'サイズが大きい', meaningKo: '큰', meaningEn: 'big, large', exampleSentence: '大きい犬がいます。', exampleMeaning: '큰 개가 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 170, kanjiId: 56, word: '大切', reading: 'たいせつ', meaning: '大事なこと', meaningKo: '소중한, 중요한', meaningEn: 'important, precious', exampleSentence: '家族は大切です。', exampleMeaning: '가족은 소중합니다.', furigana: null, jlptLevel: 4 },
  { id: 171, kanjiId: 56, word: '大変', reading: 'たいへん', meaning: 'とても難しい', meaningKo: '힘든, 대단한', meaningEn: 'terrible, very', exampleSentence: '仕事が大変です。', exampleMeaning: '일이 힘듭니다.', furigana: null, jlptLevel: 4 },

  // 男 (id: 57)
  { id: 172, kanjiId: 57, word: '男性', reading: 'だんせい', meaning: '男の人', meaningKo: '남성', meaningEn: 'man, male', exampleSentence: 'あの男性は医者です。', exampleMeaning: '저 남성은 의사입니다.', furigana: null, jlptLevel: 4 },
  { id: 173, kanjiId: 57, word: '男子', reading: 'だんし', meaning: '男の子', meaningKo: '남자, 남학생', meaningEn: 'boy, male student', exampleSentence: '男子が走っています。', exampleMeaning: '남학생이 달리고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 174, kanjiId: 57, word: '長男', reading: 'ちょうなん', meaning: '一番上の男の子', meaningKo: '장남', meaningEn: 'eldest son', exampleSentence: '長男は大学生です。', exampleMeaning: '장남은 대학생입니다.', furigana: null, jlptLevel: 4 },

  // 竹 (id: 58)
  { id: 175, kanjiId: 58, word: '竹林', reading: 'ちくりん', meaning: '竹がたくさんある所', meaningKo: '대나무숲', meaningEn: 'bamboo grove', exampleSentence: '竹林を歩きました。', exampleMeaning: '대나무숲을 걸었습니다.', furigana: null, jlptLevel: null },
  { id: 176, kanjiId: 58, word: '竹の子', reading: 'たけのこ', meaning: '竹の芽', meaningKo: '죽순', meaningEn: 'bamboo shoot', exampleSentence: '竹の子を食べました。', exampleMeaning: '죽순을 먹었습니다.', furigana: null, jlptLevel: null },
  { id: 177, kanjiId: 58, word: '竹刀', reading: 'しない', meaning: '竹で作った刀', meaningKo: '죽도', meaningEn: 'bamboo sword', exampleSentence: '竹刀で剣道をします。', exampleMeaning: '죽도로 검도를 합니다.', furigana: null, jlptLevel: null },

  // 中 (id: 59)
  { id: 178, kanjiId: 59, word: '中学校', reading: 'ちゅうがっこう', meaning: '中くらいの学校', meaningKo: '중학교', meaningEn: 'middle school', exampleSentence: '中学校に入りました。', exampleMeaning: '중학교에 들어갔습니다.', furigana: null, jlptLevel: 5 },
  { id: 179, kanjiId: 59, word: '中心', reading: 'ちゅうしん', meaning: '真ん中', meaningKo: '중심', meaningEn: 'center, core', exampleSentence: '東京は日本の中心です。', exampleMeaning: '도쿄는 일본의 중심입니다.', furigana: null, jlptLevel: 4 },
  { id: 180, kanjiId: 59, word: '一日中', reading: 'いちにちじゅう', meaning: '一日の間ずっと', meaningKo: '하루 종일', meaningEn: 'all day long', exampleSentence: '一日中本を読みました。', exampleMeaning: '하루 종일 책을 읽었습니다.', furigana: null, jlptLevel: 4 },

  // 虫 (id: 60)
  { id: 181, kanjiId: 60, word: '昆虫', reading: 'こんちゅう', meaning: '小さい虫', meaningKo: '곤충', meaningEn: 'insect', exampleSentence: '昆虫が好きです。', exampleMeaning: '곤충을 좋아합니다.', furigana: null, jlptLevel: 4 },
  { id: 182, kanjiId: 60, word: '虫歯', reading: 'むしば', meaning: '虫に食われた歯', meaningKo: '충치', meaningEn: 'cavity, decayed tooth', exampleSentence: '虫歯が痛いです。', exampleMeaning: '충치가 아픕니다.', furigana: null, jlptLevel: 4 },
  { id: 183, kanjiId: 60, word: '害虫', reading: 'がいちゅう', meaning: '害を与える虫', meaningKo: '해충', meaningEn: 'harmful insect, pest', exampleSentence: '害虫を退治しました。', exampleMeaning: '해충을 퇴치했습니다.', furigana: null, jlptLevel: null },

  // 町 (id: 61)
  { id: 184, kanjiId: 61, word: '町中', reading: 'まちなか', meaning: '町の中', meaningKo: '시내', meaningEn: 'in town, downtown', exampleSentence: '町中を散歩しました。', exampleMeaning: '시내를 산책했습니다.', furigana: null, jlptLevel: 4 },
  { id: 185, kanjiId: 61, word: '下町', reading: 'したまち', meaning: '昔からの町', meaningKo: '옛 시가지', meaningEn: 'downtown, old town', exampleSentence: '下町の雰囲気が好きです。', exampleMeaning: '옛 시가지의 분위기를 좋아합니다.', furigana: null, jlptLevel: null },
  { id: 186, kanjiId: 61, word: '町長', reading: 'ちょうちょう', meaning: '町の長', meaningKo: '읍장', meaningEn: 'town mayor', exampleSentence: '町長が挨拶をしました。', exampleMeaning: '읍장이 인사를 했습니다.', furigana: null, jlptLevel: null },

  // 天 (id: 62)
  { id: 187, kanjiId: 62, word: '天気', reading: 'てんき', meaning: '空のようす', meaningKo: '날씨', meaningEn: 'weather', exampleSentence: '明日の天気はどうですか。', exampleMeaning: '내일 날씨는 어떻습니까?', furigana: null, jlptLevel: 5 },
  { id: 188, kanjiId: 62, word: '天国', reading: 'てんごく', meaning: '天の国', meaningKo: '천국', meaningEn: 'heaven, paradise', exampleSentence: '天国のような場所です。', exampleMeaning: '천국 같은 장소입니다.', furigana: null, jlptLevel: 4 },
  { id: 189, kanjiId: 62, word: '天才', reading: 'てんさい', meaning: '才能がある人', meaningKo: '천재', meaningEn: 'genius', exampleSentence: '彼は数学の天才です。', exampleMeaning: '그는 수학 천재입니다.', furigana: null, jlptLevel: 4 },

  // 田 (id: 63)
  { id: 190, kanjiId: 63, word: '田んぼ', reading: 'たんぼ', meaning: '米を作る所', meaningKo: '논', meaningEn: 'rice paddy', exampleSentence: '田んぼに水を入れます。', exampleMeaning: '논에 물을 넣습니다.', furigana: null, jlptLevel: 4 },
  { id: 191, kanjiId: 63, word: '水田', reading: 'すいでん', meaning: '水のある田', meaningKo: '논, 수전', meaningEn: 'paddy field', exampleSentence: '水田で米を育てます。', exampleMeaning: '논에서 쌀을 재배합니다.', furigana: null, jlptLevel: null },
  { id: 192, kanjiId: 63, word: '田舎', reading: 'いなか', meaning: '都会でない所', meaningKo: '시골', meaningEn: 'countryside', exampleSentence: '田舎は空気がきれいです。', exampleMeaning: '시골은 공기가 깨끗합니다.', furigana: null, jlptLevel: 4 },

  // 土 (id: 64)
  { id: 193, kanjiId: 64, word: '土曜日', reading: 'どようび', meaning: '週の七番目の日', meaningKo: '토요일', meaningEn: 'Saturday', exampleSentence: '土曜日に友達と遊びます。', exampleMeaning: '토요일에 친구와 놉니다.', furigana: null, jlptLevel: 5 },
  { id: 194, kanjiId: 64, word: '土地', reading: 'とち', meaning: '地面', meaningKo: '토지, 땅', meaningEn: 'land, ground', exampleSentence: 'この土地は広いです。', exampleMeaning: '이 토지는 넓습니다.', furigana: null, jlptLevel: 4 },
  { id: 195, kanjiId: 64, word: '土産', reading: 'みやげ', meaning: '旅の贈り物', meaningKo: '기념품, 선물', meaningEn: 'souvenir', exampleSentence: 'お土産を買いました。', exampleMeaning: '기념품을 샀습니다.', furigana: null, jlptLevel: 4 },

  // 二 (id: 65)
  { id: 196, kanjiId: 65, word: '二月', reading: 'にがつ', meaning: '年の二番目の月', meaningKo: '2월', meaningEn: 'February', exampleSentence: '二月は寒いです。', exampleMeaning: '2월은 춥습니다.', furigana: null, jlptLevel: 5 },
  { id: 197, kanjiId: 65, word: '二人', reading: 'ふたり', meaning: '二人の人', meaningKo: '두 사람', meaningEn: 'two people', exampleSentence: '二人で映画を見ました。', exampleMeaning: '두 사람이 영화를 봤습니다.', furigana: null, jlptLevel: 5 },
  { id: 198, kanjiId: 65, word: '二つ', reading: 'ふたつ', meaning: '数の二', meaningKo: '둘', meaningEn: 'two (things)', exampleSentence: 'パンを二つ買いました。', exampleMeaning: '빵을 두 개 샀습니다.', furigana: null, jlptLevel: 5 },

  // 日 (id: 66)
  { id: 199, kanjiId: 66, word: '日本', reading: 'にほん', meaning: '日のもとの国', meaningKo: '일본', meaningEn: 'Japan', exampleSentence: '日本は島国です。', exampleMeaning: '일본은 섬나라입니다.', furigana: null, jlptLevel: 5 },
  { id: 200, kanjiId: 66, word: '毎日', reading: 'まいにち', meaning: 'どの日も', meaningKo: '매일', meaningEn: 'every day', exampleSentence: '毎日漢字を勉強します。', exampleMeaning: '매일 한자를 공부합니다.', furigana: null, jlptLevel: 5 },
  { id: 201, kanjiId: 66, word: '日曜日', reading: 'にちようび', meaning: '週の最初の日', meaningKo: '일요일', meaningEn: 'Sunday', exampleSentence: '日曜日は休みです。', exampleMeaning: '일요일은 쉬는 날입니다.', furigana: null, jlptLevel: 5 },

  // 入 (id: 67)
  { id: 202, kanjiId: 67, word: '入口', reading: 'いりぐち', meaning: '入る所', meaningKo: '입구', meaningEn: 'entrance', exampleSentence: '入口で切符を見せます。', exampleMeaning: '입구에서 표를 보여줍니다.', furigana: null, jlptLevel: 5 },
  { id: 203, kanjiId: 67, word: '入学', reading: 'にゅうがく', meaning: '学校に入ること', meaningKo: '입학', meaningEn: 'enrollment', exampleSentence: '来年入学します。', exampleMeaning: '내년에 입학합니다.', furigana: null, jlptLevel: 4 },
  { id: 204, kanjiId: 67, word: '入院', reading: 'にゅういん', meaning: '病院に入ること', meaningKo: '입원', meaningEn: 'hospitalization', exampleSentence: '祖母が入院しました。', exampleMeaning: '할머니가 입원했습니다.', furigana: null, jlptLevel: 4 },

  // 年 (id: 68)
  { id: 205, kanjiId: 68, word: '今年', reading: 'ことし', meaning: 'この年', meaningKo: '올해', meaningEn: 'this year', exampleSentence: '今年は楽しい年です。', exampleMeaning: '올해는 즐거운 해입니다.', furigana: null, jlptLevel: 5 },
  { id: 206, kanjiId: 68, word: '毎年', reading: 'まいとし', meaning: 'どの年も', meaningKo: '매년', meaningEn: 'every year', exampleSentence: '毎年旅行に行きます。', exampleMeaning: '매년 여행을 갑니다.', furigana: null, jlptLevel: 5 },
  { id: 207, kanjiId: 68, word: '来年', reading: 'らいねん', meaning: '次の年', meaningKo: '내년', meaningEn: 'next year', exampleSentence: '来年日本に行きたいです。', exampleMeaning: '내년에 일본에 가고 싶습니다.', furigana: null, jlptLevel: 5 },

  // 白 (id: 69)
  { id: 208, kanjiId: 69, word: '白い', reading: 'しろい', meaning: '色が白い', meaningKo: '하얀', meaningEn: 'white', exampleSentence: '白い雪が降っています。', exampleMeaning: '하얀 눈이 내리고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 209, kanjiId: 69, word: '白紙', reading: 'はくし', meaning: '何も書いてない紙', meaningKo: '백지', meaningEn: 'blank paper', exampleSentence: '白紙に絵を描きました。', exampleMeaning: '백지에 그림을 그렸습니다.', furigana: null, jlptLevel: 4 },
  { id: 210, kanjiId: 69, word: '白黒', reading: 'しろくろ', meaning: '白と黒', meaningKo: '흑백', meaningEn: 'black and white', exampleSentence: '白黒の写真を見ました。', exampleMeaning: '흑백 사진을 봤습니다.', furigana: null, jlptLevel: 4 },

  // 八 (id: 70)
  { id: 211, kanjiId: 70, word: '八月', reading: 'はちがつ', meaning: '年の八番目の月', meaningKo: '8월', meaningEn: 'August', exampleSentence: '八月は夏休みです。', exampleMeaning: '8월은 여름방학입니다.', furigana: null, jlptLevel: 5 },
  { id: 212, kanjiId: 70, word: '八つ', reading: 'やっつ', meaning: '数の八', meaningKo: '여덟', meaningEn: 'eight (things)', exampleSentence: 'クッキーが八つあります。', exampleMeaning: '쿠키가 여덟 개 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 213, kanjiId: 70, word: '八日', reading: 'ようか', meaning: '月の八番目の日', meaningKo: '8일', meaningEn: 'eighth day', exampleSentence: '八日に会いましょう。', exampleMeaning: '8일에 만납시다.', furigana: null, jlptLevel: 5 },

  // 百 (id: 71)
  { id: 214, kanjiId: 71, word: '百円', reading: 'ひゃくえん', meaning: '百の円', meaningKo: '백 엔', meaningEn: '100 yen', exampleSentence: '百円ショップで買いました。', exampleMeaning: '백 엔 숍에서 샀습니다.', furigana: null, jlptLevel: 5 },
  { id: 215, kanjiId: 71, word: '三百', reading: 'さんびゃく', meaning: '百の三倍', meaningKo: '삼백', meaningEn: 'three hundred', exampleSentence: '三百ページの本を読みました。', exampleMeaning: '삼백 페이지의 책을 읽었습니다.', furigana: null, jlptLevel: 5 },
  { id: 216, kanjiId: 71, word: '百科事典', reading: 'ひゃっかじてん', meaning: 'すべてを集めた本', meaningKo: '백과사전', meaningEn: 'encyclopedia', exampleSentence: '百科事典で調べました。', exampleMeaning: '백과사전에서 찾아봤습니다.', furigana: null, jlptLevel: null },

  // 文 (id: 72)
  { id: 217, kanjiId: 72, word: '文化', reading: 'ぶんか', meaning: '人の生活のようす', meaningKo: '문화', meaningEn: 'culture', exampleSentence: '日本の文化を学びます。', exampleMeaning: '일본의 문화를 배웁니다.', furigana: null, jlptLevel: 4 },
  { id: 218, kanjiId: 72, word: '文字', reading: 'もじ', meaning: '書く字', meaningKo: '문자', meaningEn: 'character, letter', exampleSentence: '文字を大きく書いてください。', exampleMeaning: '문자를 크게 써 주세요.', furigana: null, jlptLevel: 4 },
  { id: 219, kanjiId: 72, word: '作文', reading: 'さくぶん', meaning: '文を作ること', meaningKo: '작문', meaningEn: 'composition, essay', exampleSentence: '作文を書きました。', exampleMeaning: '작문을 썼습니다.', furigana: null, jlptLevel: 4 },

  // 木 (id: 73)
  { id: 220, kanjiId: 73, word: '木曜日', reading: 'もくようび', meaning: '週の五番目の日', meaningKo: '목요일', meaningEn: 'Thursday', exampleSentence: '木曜日にテニスをします。', exampleMeaning: '목요일에 테니스를 합니다.', furigana: null, jlptLevel: 5 },
  { id: 221, kanjiId: 73, word: '大木', reading: 'たいぼく', meaning: '大きな木', meaningKo: '큰 나무', meaningEn: 'large tree', exampleSentence: '公園に大木があります。', exampleMeaning: '공원에 큰 나무가 있습니다.', furigana: null, jlptLevel: null },
  { id: 222, kanjiId: 73, word: '木造', reading: 'もくぞう', meaning: '木で作ったもの', meaningKo: '목조', meaningEn: 'wooden (structure)', exampleSentence: '木造の家に住んでいます。', exampleMeaning: '목조 집에 살고 있습니다.', furigana: null, jlptLevel: null },

  // 本 (id: 74)
  { id: 223, kanjiId: 74, word: '日本', reading: 'にほん', meaning: '日本の国', meaningKo: '일본', meaningEn: 'Japan', exampleSentence: '日本に来て三年です。', exampleMeaning: '일본에 온 지 3년입니다.', furigana: null, jlptLevel: 5 },
  { id: 224, kanjiId: 74, word: '本当', reading: 'ほんとう', meaning: '嘘でないこと', meaningKo: '정말', meaningEn: 'truth, really', exampleSentence: 'これは本当の話です。', exampleMeaning: '이것은 진짜 이야기입니다.', furigana: null, jlptLevel: 5 },
  { id: 225, kanjiId: 74, word: '絵本', reading: 'えほん', meaning: '絵のある本', meaningKo: '그림책', meaningEn: 'picture book', exampleSentence: '子供に絵本を読みました。', exampleMeaning: '아이에게 그림책을 읽어 줬습니다.', furigana: null, jlptLevel: 4 },

  // 名 (id: 75)
  { id: 226, kanjiId: 75, word: '名前', reading: 'なまえ', meaning: '呼び方', meaningKo: '이름', meaningEn: 'name', exampleSentence: '名前を書いてください。', exampleMeaning: '이름을 써 주세요.', furigana: null, jlptLevel: 5 },
  { id: 227, kanjiId: 75, word: '有名', reading: 'ゆうめい', meaning: 'よく知られている', meaningKo: '유명한', meaningEn: 'famous', exampleSentence: 'この寺は有名です。', exampleMeaning: '이 절은 유명합니다.', furigana: null, jlptLevel: 5 },
  { id: 228, kanjiId: 75, word: '名人', reading: 'めいじん', meaning: '上手な人', meaningKo: '명인, 달인', meaningEn: 'master, expert', exampleSentence: '将棋の名人になりたいです。', exampleMeaning: '장기의 명인이 되고 싶습니다.', furigana: null, jlptLevel: null },

  // 目 (id: 76)
  { id: 229, kanjiId: 76, word: '目的', reading: 'もくてき', meaning: 'やりたいこと', meaningKo: '목적', meaningEn: 'purpose, goal', exampleSentence: '旅行の目的は何ですか。', exampleMeaning: '여행의 목적은 무엇입니까?', furigana: null, jlptLevel: 4 },
  { id: 230, kanjiId: 76, word: '目標', reading: 'もくひょう', meaning: '目指すもの', meaningKo: '목표', meaningEn: 'target, objective', exampleSentence: '今年の目標を決めました。', exampleMeaning: '올해의 목표를 정했습니다.', furigana: null, jlptLevel: 4 },
  { id: 231, kanjiId: 76, word: '科目', reading: 'かもく', meaning: '勉強する種類', meaningKo: '과목', meaningEn: 'subject (school)', exampleSentence: '好きな科目は音楽です。', exampleMeaning: '좋아하는 과목은 음악입니다.', furigana: null, jlptLevel: 4 },

  // 立 (id: 77)
  { id: 232, kanjiId: 77, word: '立派', reading: 'りっぱ', meaning: 'とても良い', meaningKo: '훌륭한', meaningEn: 'splendid, fine', exampleSentence: '立派な建物ですね。', exampleMeaning: '훌륭한 건물이네요.', furigana: null, jlptLevel: 4 },
  { id: 233, kanjiId: 77, word: '国立', reading: 'こくりつ', meaning: '国が作った', meaningKo: '국립', meaningEn: 'national (institution)', exampleSentence: '国立の美術館に行きました。', exampleMeaning: '국립 미술관에 갔습니다.', furigana: null, jlptLevel: 4 },
  { id: 234, kanjiId: 77, word: '独立', reading: 'どくりつ', meaning: '自分で立つこと', meaningKo: '독립', meaningEn: 'independence', exampleSentence: '独立して会社を作りました。', exampleMeaning: '독립하여 회사를 만들었습니다.', furigana: null, jlptLevel: 4 },

  // 力 (id: 78)
  { id: 235, kanjiId: 78, word: '力持ち', reading: 'ちからもち', meaning: '力がある人', meaningKo: '힘이 센 사람', meaningEn: 'strong person', exampleSentence: '彼は力持ちです。', exampleMeaning: '그는 힘이 셉니다.', furigana: null, jlptLevel: null },
  { id: 236, kanjiId: 78, word: '努力', reading: 'どりょく', meaning: '頑張ること', meaningKo: '노력', meaningEn: 'effort', exampleSentence: '努力すれば成功します。', exampleMeaning: '노력하면 성공합니다.', furigana: null, jlptLevel: 4 },
  { id: 237, kanjiId: 78, word: '電力', reading: 'でんりょく', meaning: '電気の力', meaningKo: '전력', meaningEn: 'electric power', exampleSentence: '電力を節約しましょう。', exampleMeaning: '전력을 절약합시다.', furigana: null, jlptLevel: 4 },

  // 林 (id: 79)
  { id: 238, kanjiId: 79, word: '林道', reading: 'りんどう', meaning: '林の中の道', meaningKo: '임도', meaningEn: 'forest road', exampleSentence: '林道を歩きました。', exampleMeaning: '임도를 걸었습니다.', furigana: null, jlptLevel: null },
  { id: 239, kanjiId: 79, word: '山林', reading: 'さんりん', meaning: '山の林', meaningKo: '산림', meaningEn: 'mountain forest', exampleSentence: '山林を大切にしましょう。', exampleMeaning: '산림을 소중히 합시다.', furigana: null, jlptLevel: null },
  { id: 240, kanjiId: 79, word: '林業', reading: 'りんぎょう', meaning: '木を育てる仕事', meaningKo: '임업', meaningEn: 'forestry', exampleSentence: '林業は大切な仕事です。', exampleMeaning: '임업은 중요한 일입니다.', furigana: null, jlptLevel: null },

  // 六 (id: 80)
  { id: 241, kanjiId: 80, word: '六月', reading: 'ろくがつ', meaning: '年の六番目の月', meaningKo: '6월', meaningEn: 'June', exampleSentence: '六月は梅雨です。', exampleMeaning: '6월은 장마철입니다.', furigana: null, jlptLevel: 5 },
  { id: 242, kanjiId: 80, word: '六つ', reading: 'むっつ', meaning: '数の六', meaningKo: '여섯', meaningEn: 'six (things)', exampleSentence: 'たまごが六つあります。', exampleMeaning: '달걀이 여섯 개 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 243, kanjiId: 80, word: '六日', reading: 'むいか', meaning: '月の六番目の日', meaningKo: '6일', meaningEn: 'sixth day', exampleSentence: '六日に出発します。', exampleMeaning: '6일에 출발합니다.', furigana: null, jlptLevel: 5 },

  // ===== Grade 2 Kanji Vocabulary =====

  // 引 (id: 81)
  { id: 244, kanjiId: 81, word: '引越し', reading: 'ひっこし', meaning: '家を移ること', meaningKo: '이사', meaningEn: 'moving (house)', exampleSentence: '来月引越しをします。', exampleMeaning: '다음 달에 이사를 합니다.', furigana: null, jlptLevel: 4 },
  { id: 245, kanjiId: 81, word: '引力', reading: 'いんりょく', meaning: '引く力', meaningKo: '인력', meaningEn: 'gravity, attraction', exampleSentence: '地球には引力があります。', exampleMeaning: '지구에는 인력이 있습니다.', furigana: null, jlptLevel: null },
  { id: 246, kanjiId: 81, word: '取引', reading: 'とりひき', meaning: '売り買い', meaningKo: '거래', meaningEn: 'transaction, deal', exampleSentence: '取引が成立しました。', exampleMeaning: '거래가 성립했습니다.', furigana: null, jlptLevel: 4 },

  // 羽 (id: 82)
  { id: 247, kanjiId: 82, word: '羽根', reading: 'はね', meaning: '鳥の羽', meaningKo: '깃털', meaningEn: 'feather, wing', exampleSentence: '鳥の羽根を拾いました。', exampleMeaning: '새의 깃털을 주웠습니다.', furigana: null, jlptLevel: 4 },
  { id: 248, kanjiId: 82, word: '一羽', reading: 'いちわ', meaning: '鳥を数える', meaningKo: '한 마리 (새)', meaningEn: 'one (bird)', exampleSentence: '木の上に鳥が一羽います。', exampleMeaning: '나무 위에 새가 한 마리 있습니다.', furigana: null, jlptLevel: 4 },

  // 雲 (id: 83)
  { id: 249, kanjiId: 83, word: '雲海', reading: 'うんかい', meaning: '雲の海', meaningKo: '운해', meaningEn: 'sea of clouds', exampleSentence: '山の上から雲海が見えました。', exampleMeaning: '산 위에서 운해가 보였습니다.', furigana: null, jlptLevel: null },
  { id: 250, kanjiId: 83, word: '入道雲', reading: 'にゅうどうぐも', meaning: '大きな白い雲', meaningKo: '뭉게구름', meaningEn: 'cumulonimbus cloud', exampleSentence: '夏に入道雲が出ます。', exampleMeaning: '여름에 뭉게구름이 나타납니다.', furigana: null, jlptLevel: null },

  // 園 (id: 84)
  { id: 251, kanjiId: 84, word: '公園', reading: 'こうえん', meaning: 'みんなの庭', meaningKo: '공원', meaningEn: 'park', exampleSentence: '公園で遊びます。', exampleMeaning: '공원에서 놉니다.', furigana: null, jlptLevel: 5 },
  { id: 252, kanjiId: 84, word: '動物園', reading: 'どうぶつえん', meaning: '動物がいる園', meaningKo: '동물원', meaningEn: 'zoo', exampleSentence: '動物園でパンダを見ました。', exampleMeaning: '동물원에서 판다를 봤습니다.', furigana: null, jlptLevel: 5 },

  // 遠 (id: 85)
  { id: 253, kanjiId: 85, word: '遠足', reading: 'えんそく', meaning: '遠くへ行くこと', meaningKo: '소풍', meaningEn: 'excursion', exampleSentence: '遠足が楽しかったです。', exampleMeaning: '소풍이 즐거웠습니다.', furigana: null, jlptLevel: 4 },
  { id: 254, kanjiId: 85, word: '遠い', reading: 'とおい', meaning: '距離がある', meaningKo: '먼', meaningEn: 'far, distant', exampleSentence: '学校は遠いです。', exampleMeaning: '학교는 멉니다.', furigana: null, jlptLevel: 5 },

  // 何 (id: 86)
  { id: 255, kanjiId: 86, word: '何人', reading: 'なんにん', meaning: '何人いるか', meaningKo: '몇 명', meaningEn: 'how many people', exampleSentence: '何人来ますか。', exampleMeaning: '몇 명이 옵니까?', furigana: null, jlptLevel: 5 },
  { id: 256, kanjiId: 86, word: '何時', reading: 'なんじ', meaning: '何の時間', meaningKo: '몇 시', meaningEn: 'what time', exampleSentence: '今何時ですか。', exampleMeaning: '지금 몇 시입니까?', furigana: null, jlptLevel: 5 },

  // 科 (id: 87)
  { id: 257, kanjiId: 87, word: '科学', reading: 'かがく', meaning: '物事を研究すること', meaningKo: '과학', meaningEn: 'science', exampleSentence: '科学の実験をしました。', exampleMeaning: '과학 실험을 했습니다.', furigana: null, jlptLevel: 4 },
  { id: 258, kanjiId: 87, word: '教科書', reading: 'きょうかしょ', meaning: '勉強の本', meaningKo: '교과서', meaningEn: 'textbook', exampleSentence: '教科書を開いてください。', exampleMeaning: '교과서를 펴 주세요.', furigana: null, jlptLevel: 4 },

  // 夏 (id: 88)
  { id: 259, kanjiId: 88, word: '夏休み', reading: 'なつやすみ', meaning: '夏の休み', meaningKo: '여름방학', meaningEn: 'summer vacation', exampleSentence: '夏休みに旅行します。', exampleMeaning: '여름방학에 여행합니다.', furigana: null, jlptLevel: 5 },
  { id: 260, kanjiId: 88, word: '夏祭り', reading: 'なつまつり', meaning: '夏の祭り', meaningKo: '여름 축제', meaningEn: 'summer festival', exampleSentence: '夏祭りで花火を見ました。', exampleMeaning: '여름 축제에서 불꽃놀이를 봤습니다.', furigana: null, jlptLevel: 4 },

  // 家 (id: 89)
  { id: 261, kanjiId: 89, word: '家族', reading: 'かぞく', meaning: '家の人たち', meaningKo: '가족', meaningEn: 'family', exampleSentence: '家族は五人です。', exampleMeaning: '가족은 다섯 명입니다.', furigana: null, jlptLevel: 5 },
  { id: 262, kanjiId: 89, word: '家庭', reading: 'かてい', meaning: '家と庭', meaningKo: '가정', meaningEn: 'home, household', exampleSentence: '家庭科を勉強しています。', exampleMeaning: '가정과를 공부하고 있습니다.', furigana: null, jlptLevel: 4 },

  // 歌 (id: 90)
  { id: 263, kanjiId: 90, word: '歌手', reading: 'かしゅ', meaning: '歌を歌う人', meaningKo: '가수', meaningEn: 'singer', exampleSentence: '有名な歌手が来ました。', exampleMeaning: '유명한 가수가 왔습니다.', furigana: null, jlptLevel: 4 },
  { id: 264, kanjiId: 90, word: '国歌', reading: 'こっか', meaning: '国の歌', meaningKo: '국가', meaningEn: 'national anthem', exampleSentence: '試合の前に国歌を歌います。', exampleMeaning: '시합 전에 국가를 부릅니다.', furigana: null, jlptLevel: null },

  // 画 (id: 91)
  { id: 265, kanjiId: 91, word: '映画', reading: 'えいが', meaning: '映す画', meaningKo: '영화', meaningEn: 'movie, film', exampleSentence: '映画を見に行きましょう。', exampleMeaning: '영화를 보러 갑시다.', furigana: null, jlptLevel: 5 },
  { id: 266, kanjiId: 91, word: '画家', reading: 'がか', meaning: '絵を描く人', meaningKo: '화가', meaningEn: 'painter, artist', exampleSentence: '有名な画家の絵を見ました。', exampleMeaning: '유명한 화가의 그림을 봤습니다.', furigana: null, jlptLevel: 4 },

  // 回 (id: 92)
  { id: 267, kanjiId: 92, word: '一回', reading: 'いっかい', meaning: '一度', meaningKo: '한 번', meaningEn: 'once', exampleSentence: '一回だけ行きました。', exampleMeaning: '한 번만 갔습니다.', furigana: null, jlptLevel: 5 },
  { id: 268, kanjiId: 92, word: '回答', reading: 'かいとう', meaning: '答えを返すこと', meaningKo: '회답, 대답', meaningEn: 'answer, reply', exampleSentence: '回答を書いてください。', exampleMeaning: '답을 써 주세요.', furigana: null, jlptLevel: 4 },

  // 会 (id: 93)
  { id: 269, kanjiId: 93, word: '会社', reading: 'かいしゃ', meaning: '仕事をする所', meaningKo: '회사', meaningEn: 'company', exampleSentence: '会社まで三十分です。', exampleMeaning: '회사까지 30분입니다.', furigana: null, jlptLevel: 5 },
  { id: 270, kanjiId: 93, word: '社会', reading: 'しゃかい', meaning: '人の集まり', meaningKo: '사회', meaningEn: 'society', exampleSentence: '社会のルールを守りましょう。', exampleMeaning: '사회의 규칙을 지킵시다.', furigana: null, jlptLevel: 4 },

  // 海 (id: 94)
  { id: 271, kanjiId: 94, word: '海岸', reading: 'かいがん', meaning: '海のそば', meaningKo: '해안', meaningEn: 'coast, seashore', exampleSentence: '海岸を散歩しました。', exampleMeaning: '해안을 산책했습니다.', furigana: null, jlptLevel: 4 },
  { id: 272, kanjiId: 94, word: '海外', reading: 'かいがい', meaning: '外国', meaningKo: '해외', meaningEn: 'overseas, abroad', exampleSentence: '海外旅行に行きたいです。', exampleMeaning: '해외여행을 가고 싶습니다.', furigana: null, jlptLevel: 4 },

  // 絵 (id: 95)
  { id: 273, kanjiId: 95, word: '絵本', reading: 'えほん', meaning: '絵の本', meaningKo: '그림책', meaningEn: 'picture book', exampleSentence: '絵本を読んであげました。', exampleMeaning: '그림책을 읽어 줬습니다.', furigana: null, jlptLevel: 4 },
  { id: 274, kanjiId: 95, word: '絵画', reading: 'かいが', meaning: '描いた絵', meaningKo: '회화, 그림', meaningEn: 'painting', exampleSentence: '美術館で絵画を見ました。', exampleMeaning: '미술관에서 회화를 봤습니다.', furigana: null, jlptLevel: 4 },

  // 外 (id: 96)
  { id: 275, kanjiId: 96, word: '外国', reading: 'がいこく', meaning: '他の国', meaningKo: '외국', meaningEn: 'foreign country', exampleSentence: '外国に行きたいです。', exampleMeaning: '외국에 가고 싶습니다.', furigana: null, jlptLevel: 5 },
  { id: 276, kanjiId: 96, word: '外出', reading: 'がいしゅつ', meaning: '外に出ること', meaningKo: '외출', meaningEn: 'going out', exampleSentence: '雨の日は外出しません。', exampleMeaning: '비 오는 날은 외출하지 않습니다.', furigana: null, jlptLevel: 4 },

  // 角 (id: 97)
  { id: 277, kanjiId: 97, word: '三角', reading: 'さんかく', meaning: '三つの角', meaningKo: '삼각', meaningEn: 'triangle', exampleSentence: '三角形を描きました。', exampleMeaning: '삼각형을 그렸습니다.', furigana: null, jlptLevel: 4 },
  { id: 278, kanjiId: 97, word: '角度', reading: 'かくど', meaning: '角の大きさ', meaningKo: '각도', meaningEn: 'angle', exampleSentence: '角度を測りました。', exampleMeaning: '각도를 재었습니다.', furigana: null, jlptLevel: null },

  // 楽 (id: 98)
  { id: 279, kanjiId: 98, word: '音楽', reading: 'おんがく', meaning: '楽しい音', meaningKo: '음악', meaningEn: 'music', exampleSentence: '音楽の授業が好きです。', exampleMeaning: '음악 수업을 좋아합니다.', furigana: null, jlptLevel: 5 },
  { id: 280, kanjiId: 98, word: '楽しい', reading: 'たのしい', meaning: '嬉しい気持ち', meaningKo: '즐거운', meaningEn: 'fun, enjoyable', exampleSentence: '旅行は楽しいです。', exampleMeaning: '여행은 즐겁습니다.', furigana: null, jlptLevel: 5 },

  // 活 (id: 99)
  { id: 281, kanjiId: 99, word: '生活', reading: 'せいかつ', meaning: '生きること', meaningKo: '생활', meaningEn: 'life, living', exampleSentence: '学校の生活は楽しいです。', exampleMeaning: '학교 생활은 즐겁습니다.', furigana: null, jlptLevel: 4 },
  { id: 282, kanjiId: 99, word: '活動', reading: 'かつどう', meaning: '動くこと', meaningKo: '활동', meaningEn: 'activity', exampleSentence: 'クラブ活動に参加します。', exampleMeaning: '클럽 활동에 참가합니다.', furigana: null, jlptLevel: 4 },

  // 間 (id: 100)
  { id: 283, kanjiId: 100, word: '時間', reading: 'じかん', meaning: '時の間', meaningKo: '시간', meaningEn: 'time', exampleSentence: '時間がありません。', exampleMeaning: '시간이 없습니다.', furigana: null, jlptLevel: 5 },
  { id: 284, kanjiId: 100, word: '人間', reading: 'にんげん', meaning: '人', meaningKo: '인간', meaningEn: 'human being', exampleSentence: '人間は考える動物です。', exampleMeaning: '인간은 생각하는 동물입니다.', furigana: null, jlptLevel: 4 },

  // 丸 (id: 101)
  { id: 285, kanjiId: 101, word: '丸い', reading: 'まるい', meaning: '円い形', meaningKo: '둥근', meaningEn: 'round', exampleSentence: '地球は丸いです。', exampleMeaning: '지구는 둥급니다.', furigana: null, jlptLevel: 5 },

  // 岩 (id: 102)
  { id: 286, kanjiId: 102, word: '岩山', reading: 'いわやま', meaning: '岩の山', meaningKo: '바위산', meaningEn: 'rocky mountain', exampleSentence: '岩山を登りました。', exampleMeaning: '바위산을 올랐습니다.', furigana: null, jlptLevel: null },

  // 顔 (id: 103)
  { id: 287, kanjiId: 103, word: '笑顔', reading: 'えがお', meaning: '笑った顔', meaningKo: '웃는 얼굴', meaningEn: 'smiling face', exampleSentence: '笑顔がすてきです。', exampleMeaning: '웃는 얼굴이 멋집니다.', furigana: null, jlptLevel: 4 },
  { id: 288, kanjiId: 103, word: '顔色', reading: 'かおいろ', meaning: '顔の色', meaningKo: '안색', meaningEn: 'complexion', exampleSentence: '顔色が悪いですね。', exampleMeaning: '안색이 안 좋네요.', furigana: null, jlptLevel: 4 },

  // 汽 (id: 104)
  { id: 289, kanjiId: 104, word: '汽車', reading: 'きしゃ', meaning: '蒸気で動く車', meaningKo: '기차', meaningEn: 'steam train', exampleSentence: '汽車に乗りました。', exampleMeaning: '기차를 탔습니다.', furigana: null, jlptLevel: 4 },

  // 記 (id: 105)
  { id: 290, kanjiId: 105, word: '日記', reading: 'にっき', meaning: '毎日書くもの', meaningKo: '일기', meaningEn: 'diary', exampleSentence: '毎日日記を書きます。', exampleMeaning: '매일 일기를 씁니다.', furigana: null, jlptLevel: 4 },
  { id: 291, kanjiId: 105, word: '記事', reading: 'きじ', meaning: '書いたもの', meaningKo: '기사', meaningEn: 'article', exampleSentence: '新聞の記事を読みました。', exampleMeaning: '신문 기사를 읽었습니다.', furigana: null, jlptLevel: 4 },

  // 帰 (id: 106)
  { id: 292, kanjiId: 106, word: '帰国', reading: 'きこく', meaning: '国に帰ること', meaningKo: '귀국', meaningEn: 'returning to one\'s country', exampleSentence: '来月帰国します。', exampleMeaning: '다음 달 귀국합니다.', furigana: null, jlptLevel: 4 },

  // 弓 (id: 107)
  { id: 293, kanjiId: 107, word: '弓道', reading: 'きゅうどう', meaning: '弓の道', meaningKo: '궁도', meaningEn: 'Japanese archery', exampleSentence: '弓道を習っています。', exampleMeaning: '궁도를 배우고 있습니다.', furigana: null, jlptLevel: null },

  // 牛 (id: 108)
  { id: 294, kanjiId: 108, word: '牛肉', reading: 'ぎゅうにく', meaning: '牛の肉', meaningKo: '소고기', meaningEn: 'beef', exampleSentence: '牛肉を焼きました。', exampleMeaning: '소고기를 구웠습니다.', furigana: null, jlptLevel: 4 },
  { id: 295, kanjiId: 108, word: '牛乳', reading: 'ぎゅうにゅう', meaning: '牛のミルク', meaningKo: '우유', meaningEn: 'milk', exampleSentence: '毎朝牛乳を飲みます。', exampleMeaning: '매일 아침 우유를 마십니다.', furigana: null, jlptLevel: 5 },

  // 魚 (id: 109)
  { id: 296, kanjiId: 109, word: '魚屋', reading: 'さかなや', meaning: '魚を売る店', meaningKo: '생선 가게', meaningEn: 'fish shop', exampleSentence: '魚屋で魚を買いました。', exampleMeaning: '생선 가게에서 생선을 샀습니다.', furigana: null, jlptLevel: 4 },
  { id: 297, kanjiId: 109, word: '金魚', reading: 'きんぎょ', meaning: '金色の魚', meaningKo: '금붕어', meaningEn: 'goldfish', exampleSentence: '金魚を飼っています。', exampleMeaning: '금붕어를 키우고 있습니다.', furigana: null, jlptLevel: 4 },

  // 京 (id: 110)
  { id: 298, kanjiId: 110, word: '東京', reading: 'とうきょう', meaning: '日本の首都', meaningKo: '도쿄', meaningEn: 'Tokyo', exampleSentence: '東京に住んでいます。', exampleMeaning: '도쿄에 살고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 299, kanjiId: 110, word: '京都', reading: 'きょうと', meaning: '古い都', meaningKo: '교토', meaningEn: 'Kyoto', exampleSentence: '京都でお寺を見ました。', exampleMeaning: '교토에서 절을 봤습니다.', furigana: null, jlptLevel: 5 },

  // 強 (id: 111)
  { id: 300, kanjiId: 111, word: '強い', reading: 'つよい', meaning: '力がある', meaningKo: '강한', meaningEn: 'strong', exampleSentence: '風が強いです。', exampleMeaning: '바람이 강합니다.', furigana: null, jlptLevel: 5 },
  { id: 301, kanjiId: 111, word: '勉強', reading: 'べんきょう', meaning: '学ぶこと', meaningKo: '공부', meaningEn: 'study', exampleSentence: '毎日勉強しています。', exampleMeaning: '매일 공부하고 있습니다.', furigana: null, jlptLevel: 5 },

  // 教 (id: 112)
  { id: 302, kanjiId: 112, word: '教室', reading: 'きょうしつ', meaning: '教える部屋', meaningKo: '교실', meaningEn: 'classroom', exampleSentence: '教室に入りました。', exampleMeaning: '교실에 들어갔습니다.', furigana: null, jlptLevel: 5 },
  { id: 303, kanjiId: 112, word: '教育', reading: 'きょういく', meaning: '教えること', meaningKo: '교육', meaningEn: 'education', exampleSentence: '教育は大切です。', exampleMeaning: '교육은 중요합니다.', furigana: null, jlptLevel: 4 },

  // 近 (id: 113)
  { id: 304, kanjiId: 113, word: '近所', reading: 'きんじょ', meaning: '近い所', meaningKo: '근처, 이웃', meaningEn: 'neighborhood', exampleSentence: '近所の人に会いました。', exampleMeaning: '이웃 사람을 만났습니다.', furigana: null, jlptLevel: 4 },
  { id: 305, kanjiId: 113, word: '近く', reading: 'ちかく', meaning: 'そば', meaningKo: '근처, 가까이', meaningEn: 'nearby', exampleSentence: '駅の近くに住んでいます。', exampleMeaning: '역 근처에 살고 있습니다.', furigana: null, jlptLevel: 5 },

  // 兄 (id: 114)
  { id: 306, kanjiId: 114, word: '兄弟', reading: 'きょうだい', meaning: '兄と弟', meaningKo: '형제', meaningEn: 'siblings, brothers', exampleSentence: '兄弟は三人です。', exampleMeaning: '형제는 세 명입니다.', furigana: null, jlptLevel: 5 },

  // 形 (id: 115)
  { id: 307, kanjiId: 115, word: '形', reading: 'かたち', meaning: 'もののすがた', meaningKo: '모양, 형태', meaningEn: 'shape, form', exampleSentence: 'ハートの形をしています。', exampleMeaning: '하트 모양을 하고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 308, kanjiId: 115, word: '人形', reading: 'にんぎょう', meaning: '人の形の物', meaningKo: '인형', meaningEn: 'doll', exampleSentence: '人形を買いました。', exampleMeaning: '인형을 샀습니다.', furigana: null, jlptLevel: 4 },

  // 計 (id: 116)
  { id: 309, kanjiId: 116, word: '時計', reading: 'とけい', meaning: '時間を見る物', meaningKo: '시계', meaningEn: 'clock, watch', exampleSentence: '時計を見てください。', exampleMeaning: '시계를 봐 주세요.', furigana: null, jlptLevel: 5 },
  { id: 310, kanjiId: 116, word: '計算', reading: 'けいさん', meaning: '数を数えること', meaningKo: '계산', meaningEn: 'calculation', exampleSentence: '計算が得意です。', exampleMeaning: '계산을 잘합니다.', furigana: null, jlptLevel: 4 },

  // 元 (id: 117)
  { id: 311, kanjiId: 117, word: '元気', reading: 'げんき', meaning: '体が丈夫', meaningKo: '건강, 원기', meaningEn: 'healthy, energetic', exampleSentence: '元気でいてください。', exampleMeaning: '건강하세요.', furigana: null, jlptLevel: 5 },

  // 言 (id: 118)
  { id: 312, kanjiId: 118, word: '言葉', reading: 'ことば', meaning: '話す言', meaningKo: '말, 언어', meaningEn: 'word, language', exampleSentence: '新しい言葉を覚えました。', exampleMeaning: '새로운 단어를 외웠습니다.', furigana: null, jlptLevel: 4 },

  // 原 (id: 119)
  { id: 313, kanjiId: 119, word: '原因', reading: 'げんいん', meaning: 'もとの理由', meaningKo: '원인', meaningEn: 'cause, reason', exampleSentence: '事故の原因を調べます。', exampleMeaning: '사고의 원인을 조사합니다.', furigana: null, jlptLevel: 4 },

  // 戸 (id: 120)
  { id: 314, kanjiId: 120, word: '戸口', reading: 'とぐち', meaning: '戸の入口', meaningKo: '현관, 출입구', meaningEn: 'doorway', exampleSentence: '戸口に立っています。', exampleMeaning: '현관에 서 있습니다.', furigana: null, jlptLevel: null },

  // 古 (id: 121)
  { id: 315, kanjiId: 121, word: '古い', reading: 'ふるい', meaning: '新しくない', meaningKo: '오래된', meaningEn: 'old', exampleSentence: 'この建物は古いです。', exampleMeaning: '이 건물은 오래되었습니다.', furigana: null, jlptLevel: 5 },
  { id: 316, kanjiId: 121, word: '中古', reading: 'ちゅうこ', meaning: '使ったもの', meaningKo: '중고', meaningEn: 'second-hand, used', exampleSentence: '中古の車を買いました。', exampleMeaning: '중고차를 샀습니다.', furigana: null, jlptLevel: 4 },

  // 午 (id: 122)
  { id: 317, kanjiId: 122, word: '午前', reading: 'ごぜん', meaning: '昼の前', meaningKo: '오전', meaningEn: 'morning, AM', exampleSentence: '午前中に買い物をします。', exampleMeaning: '오전 중에 쇼핑을 합니다.', furigana: null, jlptLevel: 5 },
  { id: 318, kanjiId: 122, word: '午後', reading: 'ごご', meaning: '昼の後', meaningKo: '오후', meaningEn: 'afternoon, PM', exampleSentence: '午後から雨が降ります。', exampleMeaning: '오후부터 비가 내립니다.', furigana: null, jlptLevel: 5 },

  // 後 (id: 123)
  { id: 319, kanjiId: 123, word: '午後', reading: 'ごご', meaning: '昼の後', meaningKo: '오후', meaningEn: 'afternoon', exampleSentence: '午後三時に会いましょう。', exampleMeaning: '오후 3시에 만납시다.', furigana: null, jlptLevel: 5 },
  { id: 320, kanjiId: 123, word: '最後', reading: 'さいご', meaning: '一番後', meaningKo: '마지막', meaningEn: 'last, final', exampleSentence: '最後まで頑張ります。', exampleMeaning: '끝까지 열심히 하겠습니다.', furigana: null, jlptLevel: 4 },

  // 語 (id: 124)
  { id: 321, kanjiId: 124, word: '日本語', reading: 'にほんご', meaning: '日本の言葉', meaningKo: '일본어', meaningEn: 'Japanese language', exampleSentence: '日本語を勉強しています。', exampleMeaning: '일본어를 공부하고 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 322, kanjiId: 124, word: '英語', reading: 'えいご', meaning: '英国の言葉', meaningKo: '영어', meaningEn: 'English language', exampleSentence: '英語が話せます。', exampleMeaning: '영어를 할 수 있습니다.', furigana: null, jlptLevel: 5 },

  // 工 (id: 125)
  { id: 323, kanjiId: 125, word: '工場', reading: 'こうじょう', meaning: '物を作る所', meaningKo: '공장', meaningEn: 'factory', exampleSentence: '工場で車を作っています。', exampleMeaning: '공장에서 차를 만들고 있습니다.', furigana: null, jlptLevel: 4 },

  // 公 (id: 126)
  { id: 324, kanjiId: 126, word: '公園', reading: 'こうえん', meaning: 'みんなの園', meaningKo: '공원', meaningEn: 'park', exampleSentence: '公園で花を見ました。', exampleMeaning: '공원에서 꽃을 봤습니다.', furigana: null, jlptLevel: 5 },

  // 広 (id: 127)
  { id: 325, kanjiId: 127, word: '広い', reading: 'ひろい', meaning: '場所が大きい', meaningKo: '넓은', meaningEn: 'wide, spacious', exampleSentence: 'この部屋は広いです。', exampleMeaning: '이 방은 넓습니다.', furigana: null, jlptLevel: 5 },
  { id: 326, kanjiId: 127, word: '広場', reading: 'ひろば', meaning: '広い場所', meaningKo: '광장', meaningEn: 'plaza, open space', exampleSentence: '広場で遊びましょう。', exampleMeaning: '광장에서 놉시다.', furigana: null, jlptLevel: 4 },

  // 交 (id: 128)
  { id: 327, kanjiId: 128, word: '交通', reading: 'こうつう', meaning: '行き来すること', meaningKo: '교통', meaningEn: 'traffic, transportation', exampleSentence: '交通ルールを守りましょう。', exampleMeaning: '교통 규칙을 지킵시다.', furigana: null, jlptLevel: 4 },

  // 光 (id: 129)
  { id: 328, kanjiId: 129, word: '光', reading: 'ひかり', meaning: '明るいもの', meaningKo: '빛', meaningEn: 'light', exampleSentence: '太陽の光が強いです。', exampleMeaning: '태양의 빛이 강합니다.', furigana: null, jlptLevel: 4 },

  // 考 (id: 130)
  { id: 329, kanjiId: 130, word: '考える', reading: 'かんがえる', meaning: '頭を使うこと', meaningKo: '생각하다', meaningEn: 'to think', exampleSentence: 'よく考えてから答えます。', exampleMeaning: '잘 생각하고 나서 대답합니다.', furigana: null, jlptLevel: 4 },
  { id: 330, kanjiId: 130, word: '参考', reading: 'さんこう', meaning: '考える材料', meaningKo: '참고', meaningEn: 'reference', exampleSentence: '参考にしてください。', exampleMeaning: '참고해 주세요.', furigana: null, jlptLevel: 4 },

  // 行 (id: 131)
  { id: 331, kanjiId: 131, word: '旅行', reading: 'りょこう', meaning: '遠くへ行くこと', meaningKo: '여행', meaningEn: 'travel, trip', exampleSentence: '来月旅行に行きます。', exampleMeaning: '다음 달 여행을 갑니다.', furigana: null, jlptLevel: 5 },
  { id: 332, kanjiId: 131, word: '銀行', reading: 'ぎんこう', meaning: 'お金を預ける所', meaningKo: '은행', meaningEn: 'bank', exampleSentence: '銀行でお金をおろしました。', exampleMeaning: '은행에서 돈을 찾았습니다.', furigana: null, jlptLevel: 5 },

  // 高 (id: 132)
  { id: 333, kanjiId: 132, word: '高校', reading: 'こうこう', meaning: '高い学校', meaningKo: '고등학교', meaningEn: 'high school', exampleSentence: '来年高校に入ります。', exampleMeaning: '내년에 고등학교에 들어갑니다.', furigana: null, jlptLevel: 5 },
  { id: 334, kanjiId: 132, word: '高い', reading: 'たかい', meaning: '値段や位置が高い', meaningKo: '높은, 비싼', meaningEn: 'high, expensive', exampleSentence: 'この山は高いです。', exampleMeaning: '이 산은 높습니다.', furigana: null, jlptLevel: 5 },

  // 黄 (id: 133)
  { id: 335, kanjiId: 133, word: '黄色', reading: 'きいろ', meaning: '黄の色', meaningKo: '노란색', meaningEn: 'yellow', exampleSentence: '黄色い花が咲いています。', exampleMeaning: '노란 꽃이 피어 있습니다.', furigana: null, jlptLevel: 5 },

  // 合 (id: 134)
  { id: 336, kanjiId: 134, word: '場合', reading: 'ばあい', meaning: '時と場所', meaningKo: '경우', meaningEn: 'case, situation', exampleSentence: '雨の場合は中止です。', exampleMeaning: '비인 경우 중지입니다.', furigana: null, jlptLevel: 4 },
  { id: 337, kanjiId: 134, word: '合計', reading: 'ごうけい', meaning: '全部の数', meaningKo: '합계', meaningEn: 'total', exampleSentence: '合計は千円です。', exampleMeaning: '합계는 천 엔입니다.', furigana: null, jlptLevel: 4 },

  // 谷 (id: 135)
  { id: 338, kanjiId: 135, word: '渋谷', reading: 'しぶや', meaning: '東京の町', meaningKo: '시부야', meaningEn: 'Shibuya', exampleSentence: '渋谷で買い物をしました。', exampleMeaning: '시부야에서 쇼핑을 했습니다.', furigana: null, jlptLevel: null },

  // 国 (id: 136)
  { id: 339, kanjiId: 136, word: '外国', reading: 'がいこく', meaning: '他の国', meaningKo: '외국', meaningEn: 'foreign country', exampleSentence: '外国に友達がいます。', exampleMeaning: '외국에 친구가 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 340, kanjiId: 136, word: '中国', reading: 'ちゅうごく', meaning: '中華の国', meaningKo: '중국', meaningEn: 'China', exampleSentence: '中国語を勉強しています。', exampleMeaning: '중국어를 공부하고 있습니다.', furigana: null, jlptLevel: 5 },

  // 黒 (id: 137)
  { id: 341, kanjiId: 137, word: '黒板', reading: 'こくばん', meaning: '字を書く板', meaningKo: '칠판', meaningEn: 'blackboard', exampleSentence: '黒板に字を書きます。', exampleMeaning: '칠판에 글자를 씁니다.', furigana: null, jlptLevel: 4 },

  // 今 (id: 138)
  { id: 342, kanjiId: 138, word: '今日', reading: 'きょう', meaning: 'この日', meaningKo: '오늘', meaningEn: 'today', exampleSentence: '今日は暑いです。', exampleMeaning: '오늘은 덥습니다.', furigana: null, jlptLevel: 5 },
  { id: 343, kanjiId: 138, word: '今週', reading: 'こんしゅう', meaning: 'この週', meaningKo: '이번 주', meaningEn: 'this week', exampleSentence: '今週は忙しいです。', exampleMeaning: '이번 주는 바쁩니다.', furigana: null, jlptLevel: 5 },

  // 才 (id: 139)
  { id: 344, kanjiId: 139, word: '天才', reading: 'てんさい', meaning: '才能がある人', meaningKo: '천재', meaningEn: 'genius', exampleSentence: '彼女は天才です。', exampleMeaning: '그녀는 천재입니다.', furigana: null, jlptLevel: 4 },

  // 細 (id: 140)
  { id: 345, kanjiId: 140, word: '細い', reading: 'ほそい', meaning: '太くない', meaningKo: '가는, 얇은', meaningEn: 'thin, slender', exampleSentence: '細い道を歩きました。', exampleMeaning: '좁은 길을 걸었습니다.', furigana: null, jlptLevel: 5 },

  // 作 (id: 141)
  { id: 346, kanjiId: 141, word: '作文', reading: 'さくぶん', meaning: '文を作ること', meaningKo: '작문', meaningEn: 'composition', exampleSentence: '作文を書きました。', exampleMeaning: '작문을 썼습니다.', furigana: null, jlptLevel: 4 },
  { id: 347, kanjiId: 141, word: '作品', reading: 'さくひん', meaning: '作ったもの', meaningKo: '작품', meaningEn: 'work (of art)', exampleSentence: 'すばらしい作品ですね。', exampleMeaning: '훌륭한 작품이네요.', furigana: null, jlptLevel: 4 },

  // 算 (id: 142)
  { id: 348, kanjiId: 142, word: '算数', reading: 'さんすう', meaning: '数の計算', meaningKo: '산수', meaningEn: 'arithmetic', exampleSentence: '算数のテストがあります。', exampleMeaning: '산수 시험이 있습니다.', furigana: null, jlptLevel: 4 },

  // 止 (id: 143)
  { id: 349, kanjiId: 143, word: '中止', reading: 'ちゅうし', meaning: '途中で止めること', meaningKo: '중지', meaningEn: 'cancellation, stop', exampleSentence: '試合は中止になりました。', exampleMeaning: '시합은 중지되었습니다.', furigana: null, jlptLevel: 4 },

  // 市 (id: 144)
  { id: 350, kanjiId: 144, word: '市場', reading: 'いちば', meaning: '物を売る所', meaningKo: '시장', meaningEn: 'market', exampleSentence: '市場で野菜を買いました。', exampleMeaning: '시장에서 채소를 샀습니다.', furigana: null, jlptLevel: 4 },

  // 矢 (id: 145)
  { id: 351, kanjiId: 145, word: '矢印', reading: 'やじるし', meaning: '方向を示す印', meaningKo: '화살표', meaningEn: 'arrow (sign)', exampleSentence: '矢印の方向に進みます。', exampleMeaning: '화살표 방향으로 나아갑니다.', furigana: null, jlptLevel: 4 },

  // 姉 (id: 146)
  { id: 352, kanjiId: 146, word: 'お姉さん', reading: 'おねえさん', meaning: '年上の女の人', meaningKo: '언니, 누나', meaningEn: 'older sister', exampleSentence: 'お姉さんは大学生です。', exampleMeaning: '언니는 대학생입니다.', furigana: null, jlptLevel: 5 },

  // 思 (id: 147)
  { id: 353, kanjiId: 147, word: '思い出', reading: 'おもいで', meaning: '覚えていること', meaningKo: '추억', meaningEn: 'memories', exampleSentence: '楽しい思い出がたくさんあります。', exampleMeaning: '즐거운 추억이 많습니다.', furigana: null, jlptLevel: 4 },

  // 紙 (id: 148)
  { id: 354, kanjiId: 148, word: '手紙', reading: 'てがみ', meaning: '書いて送る紙', meaningKo: '편지', meaningEn: 'letter', exampleSentence: '手紙を出しました。', exampleMeaning: '편지를 보냈습니다.', furigana: null, jlptLevel: 5 },
  { id: 355, kanjiId: 148, word: '折り紙', reading: 'おりがみ', meaning: '折る紙', meaningKo: '종이접기', meaningEn: 'origami', exampleSentence: '折り紙で鶴を作りました。', exampleMeaning: '종이접기로 학을 만들었습니다.', furigana: null, jlptLevel: 4 },

  // 寺 (id: 149)
  { id: 356, kanjiId: 149, word: 'お寺', reading: 'おてら', meaning: '仏教の建物', meaningKo: '절', meaningEn: 'temple', exampleSentence: 'お寺でお参りしました。', exampleMeaning: '절에서 참배했습니다.', furigana: null, jlptLevel: 4 },

  // 自 (id: 150)
  { id: 357, kanjiId: 150, word: '自分', reading: 'じぶん', meaning: '自分自身', meaningKo: '자기 자신', meaningEn: 'oneself', exampleSentence: '自分で考えてください。', exampleMeaning: '스스로 생각해 주세요.', furigana: null, jlptLevel: 5 },
  { id: 358, kanjiId: 150, word: '自然', reading: 'しぜん', meaning: '人が作らないもの', meaningKo: '자연', meaningEn: 'nature', exampleSentence: '自然を大切にしましょう。', exampleMeaning: '자연을 소중히 합시다.', furigana: null, jlptLevel: 4 },

  // 時 (id: 151)
  { id: 359, kanjiId: 151, word: '時間', reading: 'じかん', meaning: '時の間', meaningKo: '시간', meaningEn: 'time', exampleSentence: 'まだ時間があります。', exampleMeaning: '아직 시간이 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 360, kanjiId: 151, word: '時計', reading: 'とけい', meaning: '時を知る物', meaningKo: '시계', meaningEn: 'clock', exampleSentence: '時計が止まっています。', exampleMeaning: '시계가 멈춰 있습니다.', furigana: null, jlptLevel: 5 },

  // 室 (id: 152)
  { id: 361, kanjiId: 152, word: '教室', reading: 'きょうしつ', meaning: '教える部屋', meaningKo: '교실', meaningEn: 'classroom', exampleSentence: '教室を掃除しました。', exampleMeaning: '교실을 청소했습니다.', furigana: null, jlptLevel: 5 },

  // 社 (id: 153)
  { id: 362, kanjiId: 153, word: '会社', reading: 'かいしゃ', meaning: '仕事をする所', meaningKo: '회사', meaningEn: 'company', exampleSentence: '大きい会社に入りたいです。', exampleMeaning: '큰 회사에 들어가고 싶습니다.', furigana: null, jlptLevel: 5 },
  { id: 363, kanjiId: 153, word: '神社', reading: 'じんじゃ', meaning: '神様がいる所', meaningKo: '신사', meaningEn: 'shrine', exampleSentence: '神社にお参りしました。', exampleMeaning: '신사에 참배했습니다.', furigana: null, jlptLevel: 4 },

  // 弱 (id: 154)
  { id: 364, kanjiId: 154, word: '弱い', reading: 'よわい', meaning: '力がない', meaningKo: '약한', meaningEn: 'weak', exampleSentence: '体が弱いです。', exampleMeaning: '몸이 약합니다.', furigana: null, jlptLevel: 5 },

  // 首 (id: 155)
  { id: 365, kanjiId: 155, word: '首都', reading: 'しゅと', meaning: '国の中心の都市', meaningKo: '수도', meaningEn: 'capital city', exampleSentence: '東京は日本の首都です。', exampleMeaning: '도쿄는 일본의 수도입니다.', furigana: null, jlptLevel: 4 },

  // 秋 (id: 156)
  { id: 366, kanjiId: 156, word: '秋分', reading: 'しゅうぶん', meaning: '秋の半分の日', meaningKo: '추분', meaningEn: 'autumnal equinox', exampleSentence: '秋分の日は祝日です。', exampleMeaning: '추분의 날은 공휴일입니다.', furigana: null, jlptLevel: null },

  // 週 (id: 157)
  { id: 367, kanjiId: 157, word: '来週', reading: 'らいしゅう', meaning: '次の週', meaningKo: '다음 주', meaningEn: 'next week', exampleSentence: '来週テストがあります。', exampleMeaning: '다음 주 시험이 있습니다.', furigana: null, jlptLevel: 5 },
  { id: 368, kanjiId: 157, word: '毎週', reading: 'まいしゅう', meaning: 'どの週も', meaningKo: '매주', meaningEn: 'every week', exampleSentence: '毎週日曜日に泳ぎます。', exampleMeaning: '매주 일요일에 수영합니다.', furigana: null, jlptLevel: 5 },

  // 春 (id: 158)
  { id: 369, kanjiId: 158, word: '春休み', reading: 'はるやすみ', meaning: '春の休み', meaningKo: '봄방학', meaningEn: 'spring break', exampleSentence: '春休みに旅行します。', exampleMeaning: '봄방학에 여행합니다.', furigana: null, jlptLevel: 4 },

  // 書 (id: 159)
  { id: 370, kanjiId: 159, word: '読書', reading: 'どくしょ', meaning: '本を読むこと', meaningKo: '독서', meaningEn: 'reading (books)', exampleSentence: '読書が趣味です。', exampleMeaning: '독서가 취미입니다.', furigana: null, jlptLevel: 4 },
  { id: 371, kanjiId: 159, word: '辞書', reading: 'じしょ', meaning: '言葉の本', meaningKo: '사전', meaningEn: 'dictionary', exampleSentence: '辞書で調べました。', exampleMeaning: '사전에서 찾아봤습니다.', furigana: null, jlptLevel: 5 },

  // 少 (id: 160)
  { id: 372, kanjiId: 160, word: '少し', reading: 'すこし', meaning: 'ちょっと', meaningKo: '조금', meaningEn: 'a little', exampleSentence: '少し休みましょう。', exampleMeaning: '조금 쉽시다.', furigana: null, jlptLevel: 5 },
  { id: 373, kanjiId: 160, word: '少年', reading: 'しょうねん', meaning: '若い男の子', meaningKo: '소년', meaningEn: 'boy, youth', exampleSentence: '少年がサッカーをしています。', exampleMeaning: '소년이 축구를 하고 있습니다.', furigana: null, jlptLevel: 4 },

  // 場 (id: 161)
  { id: 374, kanjiId: 161, word: '場所', reading: 'ばしょ', meaning: 'その所', meaningKo: '장소', meaningEn: 'place, location', exampleSentence: '待ち合わせの場所を決めました。', exampleMeaning: '만남의 장소를 정했습니다.', furigana: null, jlptLevel: 4 },

  // 色 (id: 162)
  { id: 375, kanjiId: 162, word: '色々', reading: 'いろいろ', meaning: 'たくさんの種類', meaningKo: '여러 가지', meaningEn: 'various', exampleSentence: '色々な国に行きたいです。', exampleMeaning: '여러 나라에 가고 싶습니다.', furigana: null, jlptLevel: 5 },
  { id: 376, kanjiId: 162, word: '景色', reading: 'けしき', meaning: '見えるもの', meaningKo: '경치, 풍경', meaningEn: 'scenery', exampleSentence: '山の景色がきれいです。', exampleMeaning: '산의 경치가 아름답습니다.', furigana: null, jlptLevel: 4 },

  // 食 (id: 163)
  { id: 377, kanjiId: 163, word: '食事', reading: 'しょくじ', meaning: '食べること', meaningKo: '식사', meaningEn: 'meal', exampleSentence: '食事の時間です。', exampleMeaning: '식사 시간입니다.', furigana: null, jlptLevel: 4 },
  { id: 378, kanjiId: 163, word: '食堂', reading: 'しょくどう', meaning: '食べる所', meaningKo: '식당', meaningEn: 'dining hall, cafeteria', exampleSentence: '食堂でお昼を食べました。', exampleMeaning: '식당에서 점심을 먹었습니다.', furigana: null, jlptLevel: 5 },

  // 心 (id: 164)
  { id: 379, kanjiId: 164, word: '安心', reading: 'あんしん', meaning: '心が安らぐ', meaningKo: '안심', meaningEn: 'relief, peace of mind', exampleSentence: '無事で安心しました。', exampleMeaning: '무사해서 안심했습니다.', furigana: null, jlptLevel: 4 },

  // 新 (id: 165)
  { id: 380, kanjiId: 165, word: '新しい', reading: 'あたらしい', meaning: '新しいもの', meaningKo: '새로운', meaningEn: 'new', exampleSentence: '新しい靴を買いました。', exampleMeaning: '새 신발을 샀습니다.', furigana: null, jlptLevel: 5 },
  { id: 381, kanjiId: 165, word: '新聞', reading: 'しんぶん', meaning: '新しいニュース', meaningKo: '신문', meaningEn: 'newspaper', exampleSentence: '毎朝新聞を読みます。', exampleMeaning: '매일 아침 신문을 읽습니다.', furigana: null, jlptLevel: 5 },

  // 親 (id: 166)
  { id: 382, kanjiId: 166, word: '親切', reading: 'しんせつ', meaning: '優しいこと', meaningKo: '친절', meaningEn: 'kind, friendly', exampleSentence: '親切な人ですね。', exampleMeaning: '친절한 사람이네요.', furigana: null, jlptLevel: 4 },
  { id: 383, kanjiId: 166, word: '両親', reading: 'りょうしん', meaning: '父と母', meaningKo: '부모', meaningEn: 'parents', exampleSentence: '両親に感謝しています。', exampleMeaning: '부모님께 감사하고 있습니다.', furigana: null, jlptLevel: 4 },

  // 図 (id: 167)
  { id: 384, kanjiId: 167, word: '図書館', reading: 'としょかん', meaning: '本がある所', meaningKo: '도서관', meaningEn: 'library', exampleSentence: '図書館で本を借りました。', exampleMeaning: '도서관에서 책을 빌렸습니다.', furigana: null, jlptLevel: 5 },
  { id: 385, kanjiId: 167, word: '地図', reading: 'ちず', meaning: '場所の図', meaningKo: '지도', meaningEn: 'map', exampleSentence: '地図を見てください。', exampleMeaning: '지도를 봐 주세요.', furigana: null, jlptLevel: 5 },

  // 数 (id: 168)
  { id: 386, kanjiId: 168, word: '数学', reading: 'すうがく', meaning: '数の学問', meaningKo: '수학', meaningEn: 'mathematics', exampleSentence: '数学が好きです。', exampleMeaning: '수학을 좋아합니다.', furigana: null, jlptLevel: 4 },

  // 西 (id: 169)
  { id: 387, kanjiId: 169, word: '西口', reading: 'にしぐち', meaning: '西の出口', meaningKo: '서쪽 출구', meaningEn: 'west exit', exampleSentence: '西口で待っています。', exampleMeaning: '서쪽 출구에서 기다리고 있습니다.', furigana: null, jlptLevel: 5 },

  // 声 (id: 170)
  { id: 388, kanjiId: 170, word: '大声', reading: 'おおごえ', meaning: '大きい声', meaningKo: '큰 소리', meaningEn: 'loud voice', exampleSentence: '大声で話さないでください。', exampleMeaning: '큰 소리로 말하지 마세요.', furigana: null, jlptLevel: 4 },

  // 星 (id: 171)
  { id: 389, kanjiId: 171, word: '星空', reading: 'ほしぞら', meaning: '星がある空', meaningKo: '별이 가득한 하늘', meaningEn: 'starry sky', exampleSentence: '星空がきれいです。', exampleMeaning: '별이 가득한 하늘이 아름답습니다.', furigana: null, jlptLevel: null },

  // 晴 (id: 172)
  { id: 390, kanjiId: 172, word: '晴れ', reading: 'はれ', meaning: '天気がいい', meaningKo: '맑음', meaningEn: 'clear weather, sunny', exampleSentence: '明日は晴れです。', exampleMeaning: '내일은 맑습니다.', furigana: null, jlptLevel: 4 },

  // 切 (id: 173)
  { id: 391, kanjiId: 173, word: '大切', reading: 'たいせつ', meaning: '大事なこと', meaningKo: '소중한', meaningEn: 'important', exampleSentence: '友達は大切です。', exampleMeaning: '친구는 소중합니다.', furigana: null, jlptLevel: 4 },
  { id: 392, kanjiId: 173, word: '切手', reading: 'きって', meaning: '手紙に貼るもの', meaningKo: '우표', meaningEn: 'stamp', exampleSentence: '切手を買いました。', exampleMeaning: '우표를 샀습니다.', furigana: null, jlptLevel: 5 },

  // 雪 (id: 174)
  { id: 393, kanjiId: 174, word: '雪だるま', reading: 'ゆきだるま', meaning: '雪で作った人形', meaningKo: '눈사람', meaningEn: 'snowman', exampleSentence: '雪だるまを作りました。', exampleMeaning: '눈사람을 만들었습니다.', furigana: null, jlptLevel: 4 },

  // 船 (id: 175)
  { id: 394, kanjiId: 175, word: '船長', reading: 'せんちょう', meaning: '船の長', meaningKo: '선장', meaningEn: 'captain (ship)', exampleSentence: '船長が挨拶をしました。', exampleMeaning: '선장이 인사를 했습니다.', furigana: null, jlptLevel: null },

  // 線 (id: 176)
  { id: 395, kanjiId: 176, word: '新幹線', reading: 'しんかんせん', meaning: '速い電車', meaningKo: '신칸센', meaningEn: 'bullet train', exampleSentence: '新幹線で大阪に行きます。', exampleMeaning: '신칸센으로 오사카에 갑니다.', furigana: null, jlptLevel: 4 },

  // 前 (id: 177)
  { id: 396, kanjiId: 177, word: '名前', reading: 'なまえ', meaning: '呼び方', meaningKo: '이름', meaningEn: 'name', exampleSentence: '名前を教えてください。', exampleMeaning: '이름을 알려 주세요.', furigana: null, jlptLevel: 5 },
  { id: 397, kanjiId: 177, word: '午前', reading: 'ごぜん', meaning: '昼の前', meaningKo: '오전', meaningEn: 'morning, AM', exampleSentence: '午前九時に始まります。', exampleMeaning: '오전 9시에 시작합니다.', furigana: null, jlptLevel: 5 },

  // 組 (id: 178)
  { id: 398, kanjiId: 178, word: '番組', reading: 'ばんぐみ', meaning: 'テレビの番組', meaningKo: '프로그램', meaningEn: 'program (TV)', exampleSentence: '好きな番組を見ます。', exampleMeaning: '좋아하는 프로그램을 봅니다.', furigana: null, jlptLevel: 4 },

  // 走 (id: 179)
  { id: 399, kanjiId: 179, word: '走者', reading: 'そうしゃ', meaning: '走る人', meaningKo: '주자', meaningEn: 'runner', exampleSentence: '走者がゴールしました。', exampleMeaning: '주자가 골인했습니다.', furigana: null, jlptLevel: null },

  // 多 (id: 180)
  { id: 400, kanjiId: 180, word: '多い', reading: 'おおい', meaning: 'たくさん', meaningKo: '많은', meaningEn: 'many, much', exampleSentence: '今日は人が多いです。', exampleMeaning: '오늘은 사람이 많습니다.', furigana: null, jlptLevel: 5 },

  // 太 (id: 181)
  { id: 401, kanjiId: 181, word: '太陽', reading: 'たいよう', meaning: '空の光', meaningKo: '태양', meaningEn: 'sun', exampleSentence: '太陽が昇りました。', exampleMeaning: '태양이 떠올랐습니다.', furigana: null, jlptLevel: 4 },

  // 体 (id: 182)
  { id: 402, kanjiId: 182, word: '体育', reading: 'たいいく', meaning: '体を動かすこと', meaningKo: '체육', meaningEn: 'physical education', exampleSentence: '体育の授業があります。', exampleMeaning: '체육 수업이 있습니다.', furigana: null, jlptLevel: 4 },

  // 台 (id: 183)
  { id: 403, kanjiId: 183, word: '台風', reading: 'たいふう', meaning: '強い風', meaningKo: '태풍', meaningEn: 'typhoon', exampleSentence: '台風が来ています。', exampleMeaning: '태풍이 오고 있습니다.', furigana: null, jlptLevel: 4 },

  // 地 (id: 184)
  { id: 404, kanjiId: 184, word: '地図', reading: 'ちず', meaning: '場所を書いた図', meaningKo: '지도', meaningEn: 'map', exampleSentence: '地図を広げました。', exampleMeaning: '지도를 펼쳤습니다.', furigana: null, jlptLevel: 5 },
  { id: 405, kanjiId: 184, word: '地震', reading: 'じしん', meaning: '地面が揺れること', meaningKo: '지진', meaningEn: 'earthquake', exampleSentence: '昨日地震がありました。', exampleMeaning: '어제 지진이 있었습니다.', furigana: null, jlptLevel: 4 },

  // 池 (id: 185)
  { id: 406, kanjiId: 185, word: '電池', reading: 'でんち', meaning: '電気の池', meaningKo: '전지, 배터리', meaningEn: 'battery', exampleSentence: '電池を交換しました。', exampleMeaning: '배터리를 교환했습니다.', furigana: null, jlptLevel: 4 },

  // 知 (id: 186)
  { id: 407, kanjiId: 186, word: '知識', reading: 'ちしき', meaning: '知っていること', meaningKo: '지식', meaningEn: 'knowledge', exampleSentence: '知識を広げましょう。', exampleMeaning: '지식을 넓힙시다.', furigana: null, jlptLevel: 4 },

  // 茶 (id: 187)
  { id: 408, kanjiId: 187, word: 'お茶', reading: 'おちゃ', meaning: '飲み物', meaningKo: '차', meaningEn: 'tea', exampleSentence: 'お茶を飲みましょう。', exampleMeaning: '차를 마십시다.', furigana: null, jlptLevel: 5 },
  { id: 409, kanjiId: 187, word: '茶色', reading: 'ちゃいろ', meaning: '茶の色', meaningKo: '갈색', meaningEn: 'brown', exampleSentence: '茶色の鞄を持っています。', exampleMeaning: '갈색 가방을 가지고 있습니다.', furigana: null, jlptLevel: 5 },

  // 昼 (id: 188)
  { id: 410, kanjiId: 188, word: '昼食', reading: 'ちゅうしょく', meaning: '昼のごはん', meaningKo: '점심 식사', meaningEn: 'lunch', exampleSentence: '昼食を食べましょう。', exampleMeaning: '점심을 먹읍시다.', furigana: null, jlptLevel: 4 },

  // 長 (id: 189)
  { id: 411, kanjiId: 189, word: '長い', reading: 'ながい', meaning: '短くない', meaningKo: '긴', meaningEn: 'long', exampleSentence: '長い髪がすてきです。', exampleMeaning: '긴 머리카락이 멋집니다.', furigana: null, jlptLevel: 5 },
  { id: 412, kanjiId: 189, word: '社長', reading: 'しゃちょう', meaning: '会社の長', meaningKo: '사장', meaningEn: 'company president', exampleSentence: '社長に会いました。', exampleMeaning: '사장님을 만났습니다.', furigana: null, jlptLevel: 4 },

  // 鳥 (id: 190)
  { id: 413, kanjiId: 190, word: '小鳥', reading: 'ことり', meaning: '小さい鳥', meaningKo: '작은 새', meaningEn: 'small bird', exampleSentence: '小鳥が歌っています。', exampleMeaning: '작은 새가 노래하고 있습니다.', furigana: null, jlptLevel: 4 },

  // 朝 (id: 191)
  { id: 414, kanjiId: 191, word: '朝食', reading: 'ちょうしょく', meaning: '朝のごはん', meaningKo: '아침 식사', meaningEn: 'breakfast', exampleSentence: '朝食にパンを食べます。', exampleMeaning: '아침 식사로 빵을 먹습니다.', furigana: null, jlptLevel: 4 },
  { id: 415, kanjiId: 191, word: '毎朝', reading: 'まいあさ', meaning: 'どの朝も', meaningKo: '매일 아침', meaningEn: 'every morning', exampleSentence: '毎朝ジョギングします。', exampleMeaning: '매일 아침 조깅합니다.', furigana: null, jlptLevel: 5 },

  // 直 (id: 192)
  { id: 416, kanjiId: 192, word: '正直', reading: 'しょうじき', meaning: '嘘をつかない', meaningKo: '정직', meaningEn: 'honest', exampleSentence: '正直に話してください。', exampleMeaning: '정직하게 말해 주세요.', furigana: null, jlptLevel: 4 },

  // 通 (id: 193)
  { id: 417, kanjiId: 193, word: '通学', reading: 'つうがく', meaning: '学校に通うこと', meaningKo: '통학', meaningEn: 'commuting to school', exampleSentence: '自転車で通学しています。', exampleMeaning: '자전거로 통학하고 있습니다.', furigana: null, jlptLevel: 4 },

  // 弟 (id: 194)
  { id: 418, kanjiId: 194, word: '兄弟', reading: 'きょうだい', meaning: '兄と弟', meaningKo: '형제', meaningEn: 'brothers, siblings', exampleSentence: '兄弟で遊びました。', exampleMeaning: '형제끼리 놀았습니다.', furigana: null, jlptLevel: 5 },

  // 店 (id: 195)
  { id: 419, kanjiId: 195, word: '店員', reading: 'てんいん', meaning: '店の人', meaningKo: '점원', meaningEn: 'shop clerk', exampleSentence: '店員に聞きました。', exampleMeaning: '점원에게 물어봤습니다.', furigana: null, jlptLevel: 4 },

  // 点 (id: 196)
  { id: 420, kanjiId: 196, word: '百点', reading: 'ひゃくてん', meaning: '満点', meaningKo: '백점', meaningEn: '100 points', exampleSentence: 'テストで百点を取りました。', exampleMeaning: '시험에서 백점을 받았습니다.', furigana: null, jlptLevel: 4 },

  // 電 (id: 197)
  { id: 421, kanjiId: 197, word: '電話', reading: 'でんわ', meaning: '電気で話す', meaningKo: '전화', meaningEn: 'telephone', exampleSentence: '電話をかけました。', exampleMeaning: '전화를 걸었습니다.', furigana: null, jlptLevel: 5 },
  { id: 422, kanjiId: 197, word: '電車', reading: 'でんしゃ', meaning: '電気の車', meaningKo: '전차, 전철', meaningEn: 'train', exampleSentence: '電車が来ました。', exampleMeaning: '전철이 왔습니다.', furigana: null, jlptLevel: 5 },

  // 刀 (id: 198)
  { id: 423, kanjiId: 198, word: '日本刀', reading: 'にほんとう', meaning: '日本の刀', meaningKo: '일본도', meaningEn: 'Japanese sword', exampleSentence: '日本刀は美しいです。', exampleMeaning: '일본도는 아름답습니다.', furigana: null, jlptLevel: null },

  // 冬 (id: 199)
  { id: 424, kanjiId: 199, word: '冬休み', reading: 'ふゆやすみ', meaning: '冬の休み', meaningKo: '겨울방학', meaningEn: 'winter vacation', exampleSentence: '冬休みにスキーをします。', exampleMeaning: '겨울방학에 스키를 탑니다.', furigana: null, jlptLevel: 4 },

  // 当 (id: 200)
  { id: 425, kanjiId: 200, word: '本当', reading: 'ほんとう', meaning: '嘘でない', meaningKo: '정말', meaningEn: 'really, truly', exampleSentence: '本当ですか。', exampleMeaning: '정말입니까?', furigana: null, jlptLevel: 5 },

  // 東 (id: 201)
  { id: 426, kanjiId: 201, word: '東京', reading: 'とうきょう', meaning: '日本の首都', meaningKo: '도쿄', meaningEn: 'Tokyo', exampleSentence: '東京タワーを見ました。', exampleMeaning: '도쿄 타워를 봤습니다.', furigana: null, jlptLevel: 5 },
  { id: 427, kanjiId: 201, word: '東口', reading: 'ひがしぐち', meaning: '東の出口', meaningKo: '동쪽 출구', meaningEn: 'east exit', exampleSentence: '東口で待ちます。', exampleMeaning: '동쪽 출구에서 기다립니다.', furigana: null, jlptLevel: 5 },

  // 答 (id: 202)
  { id: 428, kanjiId: 202, word: '答え', reading: 'こたえ', meaning: '質問の返事', meaningKo: '대답, 답', meaningEn: 'answer', exampleSentence: '答えを書いてください。', exampleMeaning: '답을 써 주세요.', furigana: null, jlptLevel: 4 },

  // 頭 (id: 203)
  { id: 429, kanjiId: 203, word: '頭痛', reading: 'ずつう', meaning: '頭が痛いこと', meaningKo: '두통', meaningEn: 'headache', exampleSentence: '頭痛がします。', exampleMeaning: '두통이 있습니다.', furigana: null, jlptLevel: 4 },

  // 同 (id: 204)
  { id: 430, kanjiId: 204, word: '同じ', reading: 'おなじ', meaning: '変わらない', meaningKo: '같은', meaningEn: 'same', exampleSentence: '同じ学校に通っています。', exampleMeaning: '같은 학교에 다니고 있습니다.', furigana: null, jlptLevel: 5 },

  // 道 (id: 205)
  { id: 431, kanjiId: 205, word: '道路', reading: 'どうろ', meaning: '車が通る道', meaningKo: '도로', meaningEn: 'road', exampleSentence: '道路を渡ります。', exampleMeaning: '도로를 건넙니다.', furigana: null, jlptLevel: 4 },

  // 読 (id: 206)
  { id: 432, kanjiId: 206, word: '読書', reading: 'どくしょ', meaning: '本を読むこと', meaningKo: '독서', meaningEn: 'reading', exampleSentence: '読書の時間です。', exampleMeaning: '독서 시간입니다.', furigana: null, jlptLevel: 4 },

  // 内 (id: 207)
  { id: 433, kanjiId: 207, word: '案内', reading: 'あんない', meaning: '教えること', meaningKo: '안내', meaningEn: 'guidance, information', exampleSentence: '駅の案内を見ました。', exampleMeaning: '역의 안내를 봤습니다.', furigana: null, jlptLevel: 4 },

  // 南 (id: 208)
  { id: 434, kanjiId: 208, word: '南口', reading: 'みなみぐち', meaning: '南の出口', meaningKo: '남쪽 출구', meaningEn: 'south exit', exampleSentence: '南口から出てください。', exampleMeaning: '남쪽 출구로 나와 주세요.', furigana: null, jlptLevel: 5 },

  // 肉 (id: 209)
  { id: 435, kanjiId: 209, word: '肉屋', reading: 'にくや', meaning: '肉を売る店', meaningKo: '정육점', meaningEn: 'meat shop, butcher', exampleSentence: '肉屋で肉を買いました。', exampleMeaning: '정육점에서 고기를 샀습니다.', furigana: null, jlptLevel: 4 },

  // 馬 (id: 210)
  { id: 436, kanjiId: 210, word: '馬車', reading: 'ばしゃ', meaning: '馬が引く車', meaningKo: '마차', meaningEn: 'horse-drawn carriage', exampleSentence: '馬車に乗りました。', exampleMeaning: '마차를 탔습니다.', furigana: null, jlptLevel: null },

  // 売 (id: 211)
  { id: 437, kanjiId: 211, word: '売店', reading: 'ばいてん', meaning: '物を売る店', meaningKo: '매점', meaningEn: 'stand, kiosk', exampleSentence: '売店でジュースを買いました。', exampleMeaning: '매점에서 주스를 샀습니다.', furigana: null, jlptLevel: 4 },

  // 買 (id: 212)
  { id: 438, kanjiId: 212, word: '買い物', reading: 'かいもの', meaning: '物を買うこと', meaningKo: '쇼핑', meaningEn: 'shopping', exampleSentence: '買い物に行きましょう。', exampleMeaning: '쇼핑하러 갑시다.', furigana: null, jlptLevel: 5 },

  // 麦 (id: 213)
  { id: 439, kanjiId: 213, word: '麦茶', reading: 'むぎちゃ', meaning: '麦で作ったお茶', meaningKo: '보리차', meaningEn: 'barley tea', exampleSentence: '夏は麦茶を飲みます。', exampleMeaning: '여름에는 보리차를 마십니다.', furigana: null, jlptLevel: 4 },

  // 半 (id: 214)
  { id: 440, kanjiId: 214, word: '半分', reading: 'はんぶん', meaning: '二つに分けた一つ', meaningKo: '반, 절반', meaningEn: 'half', exampleSentence: 'ケーキを半分に切りました。', exampleMeaning: '케이크를 반으로 잘랐습니다.', furigana: null, jlptLevel: 5 },

  // 番 (id: 215)
  { id: 441, kanjiId: 215, word: '一番', reading: 'いちばん', meaning: '最も', meaningKo: '가장, 제일', meaningEn: 'number one, most', exampleSentence: '一番好きな食べ物は寿司です。', exampleMeaning: '가장 좋아하는 음식은 초밥입니다.', furigana: null, jlptLevel: 5 },
  { id: 442, kanjiId: 215, word: '番号', reading: 'ばんごう', meaning: '数の順番', meaningKo: '번호', meaningEn: 'number', exampleSentence: '電話番号を教えてください。', exampleMeaning: '전화번호를 알려 주세요.', furigana: null, jlptLevel: 4 },

  // 父 (id: 216)
  { id: 443, kanjiId: 216, word: 'お父さん', reading: 'おとうさん', meaning: '父親', meaningKo: '아버지', meaningEn: 'father', exampleSentence: 'お父さんは会社員です。', exampleMeaning: '아버지는 회사원입니다.', furigana: null, jlptLevel: 5 },

  // 風 (id: 217)
  { id: 444, kanjiId: 217, word: '台風', reading: 'たいふう', meaning: '強い風', meaningKo: '태풍', meaningEn: 'typhoon', exampleSentence: '台風が近づいています。', exampleMeaning: '태풍이 다가오고 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 445, kanjiId: 217, word: '風景', reading: 'ふうけい', meaning: '自然のようす', meaningKo: '풍경', meaningEn: 'scenery, landscape', exampleSentence: '美しい風景を見ました。', exampleMeaning: '아름다운 풍경을 봤습니다.', furigana: null, jlptLevel: 4 },

  // 分 (id: 218)
  { id: 446, kanjiId: 218, word: '自分', reading: 'じぶん', meaning: '自分自身', meaningKo: '자기 자신', meaningEn: 'oneself', exampleSentence: '自分の名前を書きます。', exampleMeaning: '자기 이름을 씁니다.', furigana: null, jlptLevel: 5 },

  // 聞 (id: 219)
  { id: 447, kanjiId: 219, word: '新聞', reading: 'しんぶん', meaning: '新しいニュース', meaningKo: '신문', meaningEn: 'newspaper', exampleSentence: '新聞を読んでいます。', exampleMeaning: '신문을 읽고 있습니다.', furigana: null, jlptLevel: 5 },

  // 米 (id: 220)
  { id: 448, kanjiId: 220, word: 'お米', reading: 'おこめ', meaning: '食べる米', meaningKo: '쌀', meaningEn: 'rice (uncooked)', exampleSentence: 'お米を炊きました。', exampleMeaning: '쌀밥을 지었습니다.', furigana: null, jlptLevel: 4 },

  // 歩 (id: 221)
  { id: 449, kanjiId: 221, word: '散歩', reading: 'さんぽ', meaning: '歩くこと', meaningKo: '산책', meaningEn: 'walk, stroll', exampleSentence: '公園を散歩しました。', exampleMeaning: '공원을 산책했습니다.', furigana: null, jlptLevel: 5 },

  // 母 (id: 222)
  { id: 450, kanjiId: 222, word: 'お母さん', reading: 'おかあさん', meaning: '母親', meaningKo: '어머니', meaningEn: 'mother', exampleSentence: 'お母さんの料理はおいしいです。', exampleMeaning: '어머니의 요리는 맛있습니다.', furigana: null, jlptLevel: 5 },

  // 方 (id: 223)
  { id: 451, kanjiId: 223, word: '方法', reading: 'ほうほう', meaning: 'やり方', meaningKo: '방법', meaningEn: 'method, way', exampleSentence: 'いい方法を考えましょう。', exampleMeaning: '좋은 방법을 생각합시다.', furigana: null, jlptLevel: 4 },
  { id: 452, kanjiId: 223, word: '夕方', reading: 'ゆうがた', meaning: '日が沈む頃', meaningKo: '저녁때', meaningEn: 'evening', exampleSentence: '夕方に帰ります。', exampleMeaning: '저녁때 돌아갑니다.', furigana: null, jlptLevel: 5 },

  // 北 (id: 224)
  { id: 453, kanjiId: 224, word: '北口', reading: 'きたぐち', meaning: '北の出口', meaningKo: '북쪽 출구', meaningEn: 'north exit', exampleSentence: '北口で待ちましょう。', exampleMeaning: '북쪽 출구에서 기다립시다.', furigana: null, jlptLevel: 5 },
  { id: 454, kanjiId: 224, word: '北海道', reading: 'ほっかいどう', meaning: '日本の北の島', meaningKo: '홋카이도', meaningEn: 'Hokkaido', exampleSentence: '北海道でスキーをしました。', exampleMeaning: '홋카이도에서 스키를 탔습니다.', furigana: null, jlptLevel: null },

  // 毎 (id: 225)
  { id: 455, kanjiId: 225, word: '毎日', reading: 'まいにち', meaning: 'どの日も', meaningKo: '매일', meaningEn: 'every day', exampleSentence: '毎日練習します。', exampleMeaning: '매일 연습합니다.', furigana: null, jlptLevel: 5 },

  // 妹 (id: 226)
  { id: 456, kanjiId: 226, word: '姉妹', reading: 'しまい', meaning: '姉と妹', meaningKo: '자매', meaningEn: 'sisters', exampleSentence: '姉妹で買い物に行きました。', exampleMeaning: '자매끼리 쇼핑을 갔습니다.', furigana: null, jlptLevel: 4 },

  // 万 (id: 227)
  { id: 457, kanjiId: 227, word: '一万円', reading: 'いちまんえん', meaning: '一万の円', meaningKo: '만 엔', meaningEn: '10,000 yen', exampleSentence: '一万円札を使いました。', exampleMeaning: '만 엔짜리를 사용했습니다.', furigana: null, jlptLevel: 5 },

  // 明 (id: 228)
  { id: 458, kanjiId: 228, word: '明日', reading: 'あした', meaning: '次の日', meaningKo: '내일', meaningEn: 'tomorrow', exampleSentence: '明日は休みです。', exampleMeaning: '내일은 쉬는 날입니다.', furigana: null, jlptLevel: 5 },
  { id: 459, kanjiId: 228, word: '説明', reading: 'せつめい', meaning: '分かるように話す', meaningKo: '설명', meaningEn: 'explanation', exampleSentence: '説明してください。', exampleMeaning: '설명해 주세요.', furigana: null, jlptLevel: 4 },

  // 鳴 (id: 229)
  { id: 460, kanjiId: 229, word: '鳴き声', reading: 'なきごえ', meaning: '動物の声', meaningKo: '울음소리', meaningEn: 'cry, call (animal)', exampleSentence: '猫の鳴き声が聞こえます。', exampleMeaning: '고양이 울음소리가 들립니다.', furigana: null, jlptLevel: 4 },

  // 毛 (id: 230)
  { id: 461, kanjiId: 230, word: '毛布', reading: 'もうふ', meaning: '体にかける布', meaningKo: '담요', meaningEn: 'blanket', exampleSentence: '毛布をかけて寝ます。', exampleMeaning: '담요를 덮고 잡니다.', furigana: null, jlptLevel: 4 },

  // 門 (id: 231)
  { id: 462, kanjiId: 231, word: '正門', reading: 'せいもん', meaning: '正面の門', meaningKo: '정문', meaningEn: 'main gate', exampleSentence: '正門から入ります。', exampleMeaning: '정문에서 들어갑니다.', furigana: null, jlptLevel: 4 },
  { id: 463, kanjiId: 231, word: '専門', reading: 'せんもん', meaning: '得意なこと', meaningKo: '전문', meaningEn: 'specialty', exampleSentence: '専門は数学です。', exampleMeaning: '전문은 수학입니다.', furigana: null, jlptLevel: 4 },

  // 夜 (id: 232)
  { id: 464, kanjiId: 232, word: '夜中', reading: 'よなか', meaning: '夜の間', meaningKo: '한밤중', meaningEn: 'midnight, middle of night', exampleSentence: '夜中に目が覚めました。', exampleMeaning: '한밤중에 잠이 깼습니다.', furigana: null, jlptLevel: 4 },

  // 野 (id: 233)
  { id: 465, kanjiId: 233, word: '野菜', reading: 'やさい', meaning: '畑の菜', meaningKo: '채소', meaningEn: 'vegetable', exampleSentence: '野菜を食べましょう。', exampleMeaning: '채소를 먹읍시다.', furigana: null, jlptLevel: 5 },
  { id: 466, kanjiId: 233, word: '野球', reading: 'やきゅう', meaning: '球の競技', meaningKo: '야구', meaningEn: 'baseball', exampleSentence: '野球が好きです。', exampleMeaning: '야구를 좋아합니다.', furigana: null, jlptLevel: 4 },

  // 友 (id: 234)
  { id: 467, kanjiId: 234, word: '友達', reading: 'ともだち', meaning: '仲の良い人', meaningKo: '친구', meaningEn: 'friend', exampleSentence: '友達と遊びます。', exampleMeaning: '친구와 놉니다.', furigana: null, jlptLevel: 5 },

  // 用 (id: 235)
  { id: 468, kanjiId: 235, word: '用事', reading: 'ようじ', meaning: 'やること', meaningKo: '볼일, 용무', meaningEn: 'errand, business', exampleSentence: '用事があります。', exampleMeaning: '볼일이 있습니다.', furigana: null, jlptLevel: 4 },
  { id: 469, kanjiId: 235, word: '利用', reading: 'りよう', meaning: '使うこと', meaningKo: '이용', meaningEn: 'use, utilization', exampleSentence: '図書館を利用しています。', exampleMeaning: '도서관을 이용하고 있습니다.', furigana: null, jlptLevel: 4 },

  // 曜 (id: 236)
  { id: 470, kanjiId: 236, word: '曜日', reading: 'ようび', meaning: '一週間の日', meaningKo: '요일', meaningEn: 'day of the week', exampleSentence: '何曜日ですか。', exampleMeaning: '무슨 요일입니까?', furigana: null, jlptLevel: 5 },

  // 来 (id: 237)
  { id: 471, kanjiId: 237, word: '来年', reading: 'らいねん', meaning: '次の年', meaningKo: '내년', meaningEn: 'next year', exampleSentence: '来年も頑張ります。', exampleMeaning: '내년에도 열심히 하겠습니다.', furigana: null, jlptLevel: 5 },
  { id: 472, kanjiId: 237, word: '来月', reading: 'らいげつ', meaning: '次の月', meaningKo: '다음 달', meaningEn: 'next month', exampleSentence: '来月結婚します。', exampleMeaning: '다음 달 결혼합니다.', furigana: null, jlptLevel: 5 },

  // 里 (id: 238)
  { id: 473, kanjiId: 238, word: '里山', reading: 'さとやま', meaning: '村の近くの山', meaningKo: '마을 뒷산', meaningEn: 'village mountain', exampleSentence: '里山を歩きました。', exampleMeaning: '마을 뒷산을 걸었습니다.', furigana: null, jlptLevel: null },

  // 理 (id: 239)
  { id: 474, kanjiId: 239, word: '料理', reading: 'りょうり', meaning: '食べ物を作ること', meaningKo: '요리', meaningEn: 'cooking, cuisine', exampleSentence: '料理を作るのが好きです。', exampleMeaning: '요리하는 것을 좋아합니다.', furigana: null, jlptLevel: 5 },
  { id: 475, kanjiId: 239, word: '地理', reading: 'ちり', meaning: '土地のようす', meaningKo: '지리', meaningEn: 'geography', exampleSentence: '地理の授業があります。', exampleMeaning: '지리 수업이 있습니다.', furigana: null, jlptLevel: 4 },

  // 話 (id: 240)
  { id: 476, kanjiId: 240, word: '電話', reading: 'でんわ', meaning: '電気で話す', meaningKo: '전화', meaningEn: 'telephone', exampleSentence: '電話番号を教えてください。', exampleMeaning: '전화번호를 알려 주세요.', furigana: null, jlptLevel: 5 },
  { id: 477, kanjiId: 240, word: '会話', reading: 'かいわ', meaning: '話し合うこと', meaningKo: '회화, 대화', meaningEn: 'conversation', exampleSentence: '日本語の会話を練習します。', exampleMeaning: '일본어 회화를 연습합니다.', furigana: null, jlptLevel: 4 },
];
