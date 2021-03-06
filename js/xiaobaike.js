var baike = {
    dy: "钓鱼指数是根据气象因素对垂钓的影响程度，提取出影响垂钓的主要气象因素：温度、风速、天气现象、温度日变化等，进行综合考虑计算得出，利用钓鱼指数人们可以选择合适的水域，在有利于钓鱼的气象条件下垂钓。",
    gj: "逛街指数是根据影响人们逛街的主要的气象因子：温度，天气现象、风速等，按一定的经验公式进行分级，以便人们根据逛街指数来安排自己的行程。逛街指数分为4级，一般级数越高越不适宜逛街。",
    hc: "由于划船是在露天的水面上活动，天气条件的影响对游客的安全至关重要。划船气象指数是综合分析了影响划船的天气现象、风速、温度等气象要素而研制的。它可以为各公园船队和游人提供是否适宜划船的专业气象预报服务，以充分利用有利的天气条件进行划船活动，而避免不利天气条件造成的危害。划船指数分为三级，级数 越高越不适宜划船等水上户外运动。",
    cl: "晨练指数是气象部门根据气象因素对晨练人身体健康的影响，综合了温度、风速、天气现象、前一天的降水情况等气象条件，并将一年分为两个时段(冬半年和夏半年)，制定了晨练环境气象要素标准，晨练的人特别是中老年人，应根据晨练指数，有选择地进行晨练，这样才能保证身体不受外界不良气象条件的影响，真正达到锻炼身体的目的。",
    co: "舒适度指数是结合温度、湿度、风等气象要素对人体综合作用，表征人体在大气环境中舒适与否，提示人们可以根据天气的变化，来调节自身生理及适应冷暖环境，以及防范天气冷热突变的指数，便于人们了解在多变的天气下身体的舒适程度，预防由某些天气造成的人体不舒适而导致的疾病等。舒适度指数分为9级，级数越高，气象条件对人体舒适感的影响越大，舒适感越差。",
    uv: "紫外线指数是指一天当中太阳在天空中的位置最高时（也即中午前后），到达地面的太阳光线中紫外线辐射对人体皮肤的可能损伤程度。紫外线指数一般用0－15表示。通常规定，夜间紫外线指数为0，在热带或高原地区、晴天无云时，紫外线最强，指数为15。可见紫外线指数值越大，表示紫外线辐射对人体危害越大，也表示在较短时间内对皮肤的伤害愈强。",
    ac: "空调开启指数是综合考虑了当日温度、湿度和连续三天的温度情况，根据人体的生理与健康要求，计算出指导人们适当使用空调的指数。空调开启指数分为5级，空调开启级数越低，越要开启制冷空调进行降温，级数最高时，则应适当采取供暖措施。",
    ag: "过敏气象指数是考虑气象因素并结合环境要素对人体的影响，从天气角度出发为广大公众提供是否易发生过敏的服务提示。过敏气象指数等级划分为五级，级数越高，表示目前的气象条件，引发过敏的可能性越大。",
    be: "",
    bp: "",
    ct: "穿衣指数是贴近人们生活的气象指标，在四季不同的季节里，人们会通过不同的天气条件而选择穿衣薄厚，穿衣指数这时候就起到了提醒的作用，提请人们根据天气变化而进行换装，减少疾病的发生，尤其是感冒。 ",
    fs: "",
    gl: "",
    gm: "感冒指数是气象部门就气象条件对人们发生感冒的影响程度，根据当日温度、湿度、风速、天气现象、温度日较差等气象因素提出来的，以便市民们，特别是儿童、老人等易发人群可以在关注天气预报的同时，用感冒指数来确定感冒发生的几率和衣服的增减及活动的安排等。",
    gz: "",
    jt: "交通气象指数是根据雨、雪、雾、沙尘、阴晴等天气现象对交通状况的影响进行分类，其中主要以能见度为标准，并包括对路面状况的描述，以提醒广大司机朋友在此种天气状况下出行时，能见度是否良好，刹车距离是否应延长，是否容易发生交通事故等，减少由于不利天气状况而造成的人员及财产损失。交通指数分为5级，级数越高，天气现象对交通的影响越大。",
    lk: "路况气象指数是根据天气的变化，结合当日天气现象和前12小时的天气现象对路面状况的影响而提出的一种指数，以便提醒广大司机朋友路面是否潮湿，湿滑，有积雪或积冰，是否道路便于行驶。这样可以避免由于气象因素而造成的交通事故，减少由于不利天气状况而造成的人员及财产损失。",
    ls: "晾晒指数是根据温度、风速、天空状况的预报对晾晒的影响情况，对人们进行晾晒活动的适宜程度进行分级，从而指导人们适时安排晾晒衣物等家庭用品或农作物、药材等。晾晒指数分为5级，级数越低，气象条件对人们进行晾晒活动越有利。",
    mf: "美发指数主要是根据适宜头发生长的气象环境，结合实际的温度、湿度、紫外线强度、风速对人们是否在此气象条件下适合美发提出意见，以期对人们美发起一定的指导作用。美发指数分为3级，级数越低，气象条件就越适宜头发的生长。",
    nl: "夜生活指数是从天气对人体感觉的影响出发，其中包括各种夜间天气要素，如高温，严寒，下雨，暴雪，阴天，雷电天气等，给市民提供一个是否适宜夜生活的建议。",
    pj: "最早起源于欧洲，近年来我国根据主要影响人们喝啤酒的气象因素(温度、湿度)研究出针对我国的啤酒气象指数，以便正确引导市民啤酒消费，指导啤酒商家销售。通常在寒冷干燥季节，应少喝啤酒且尽量喝些常温或稍加热啤酒;湿热天气饮用冰镇啤酒倍感舒适;而干热天气时，啤酒可作为最好的防暑降温饮品。啤酒气象指数 分为5级，一般级数越高，越适合饮用啤酒。",
    pk: "由于放风筝是一种户外活动，所以受气象条件制约很大。放风筝指数是根据温度、风速、天气现象等气象因子对放风筝活动的影响程度制定出的一种指数，它分为三级，级数越高，越不适宜放风筝。",
    pl: "空气污染扩散气象条件指数是不考虑污染源的情况下，从气象角度出发，对未来大气污染物的稀释、扩散、聚积和清除能力进行评价，主要考虑的气象因素是温度、湿度、风速和天气现象，对气象条件进行分级，空气污染扩散条件指数分为5级，级数越高气象条件越不利于污染物的扩散。",
    pp: "化妆指数是根据气象条件对人的皮肤的影响制定出来的指数，主要影响有温度、湿度、风速、紫外线强度，根据不同的气象条件来采取不同的保护措施，如保湿、防晒、保湿防晒、去油、防脱水等等一系列的措施，以减少恶劣气象条件对皮肤的伤害",
    pt: "",
    st: "在不同的气象条件下，人体对相同的气温其感受是不同的。体感温度就是在综合了空气温度、湿度、风速以及天空云量、日照时数等因素影响后，人体实际上感受到的温度。",
    tr: "出行指数同样需要根据当天的天气、气温和风力情况来确定，一共分为四个等级，等级越低表明气象条件越恶劣，等级越高，天气越好，越适合出行。",
    wc: "风寒指数是舒适度指数在秋冬季节的一个细化，由于秋冬季节气温变化起伏较大，人体感觉受风雪天气、湿度等因素的影响较暖季更为敏感。风寒指数综合考虑了气温和风速对人体的影响，人们可根据风寒指数，采取相应的防寒措施。风寒指数分为6级，级数越高，人们的防寒意识越大。",
    xc: "洗车指数是指过去12小时和未来48小时有无雨雪天气，路面是否有积雪和泥水，是否容易使汽车溅上泥水，是否有沙尘等天气条件，给广大爱车族提供是否适宜洗车和建议。洗车指数共分为4级，级数越高，就越不适宜洗车。",
    yd: "运动指数是考虑气象因素和环境对人体的影响，包括紫外线、风力、气压、温度、光照以及雨雪沙尘等，为广大老百姓提供的是否适宜运动的建议。运动指数分为3级，级数越高，就越不适宜运动。",
    yh: "约会指数是从天气对人体感觉和对环境气氛的影响出发而编制的一种指数，各种天气要素，如高温，严寒，下雨，暴雪，阴天，雷电天气等都会对外出活动产生不利影响，但是在一些特殊的天气下例如小雪无风且气温不低的情况下，却能营造出适宜约会的浪漫气氛，所以综合考虑天气状况，提供一个是否适宜约会的建议。",
    "": "ys",
    "顾名思义，指为公众提供的出行是否需要带雨伞的建议。根据天气状况是否会下雨或下雪，会下何种等级的雨(雪)、阵雨、中雨、还是大暴雨等，综合上述的因素给市民一个出门是否需要带伞的建议。": "",
    zs: "气温，湿度等气象因素对人体的影响是综合性的，在相同的气温下，湿度不同对人体产生的影响也不同，中暑指数是综合了气温，空气湿度，光照等天气因子对人体热承受力的影响进行的评述，以帮助人们注意防暑降温，提示人们避免在易中暑的环境下工作。中暑指数分为4级，级数越高，中暑的几率越大。",
    xq: "心情指数是从天气对人体感觉的影响出发而制定的一种指数，各种天气要素，如闷热、湿冷、阴沉、沙尘等天气都会对人的情绪产生不利影响，但是在一些其它的天气下例如晴朗、阳光灿烂、飘雪等情况却有助于人们的情绪稳定，所以综合考虑天气与心情的关系，使人们可以适当调节自己的情绪。"
};