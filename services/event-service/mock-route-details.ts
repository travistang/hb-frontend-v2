import { RouteDetails, Terrain } from "./types";

// Helper function to provide elevation statistics for routes
function getElevationStats(routeId: number) {
  // Simple reasonable elevation stats for each route
  const stats = {
    1: { elevationLost: 245, highestPoint: 1453 },
    2: { elevationLost: 320, highestPoint: 1680 },
    3: { elevationLost: 180, highestPoint: 1200 },
  };

  return (
    stats[routeId as keyof typeof stats] || {
      elevationLost: 200,
      highestPoint: 1400,
    }
  );
}

// Mock route details data - base routes without calculated stats
const baseMockRouteDetails = [
  {
    id: 1,
    name: "Jochberg Mountain Trail",
    distance: 8.5,
    elevation_gain: 586, // 1453m - 867m
    duration: 240, // 4 hours in minutes
    rating: 1850, // ELO-style rating
    sac_scale: 3,
    peaks: [],
    huts: [],
    boundingBox: {
      minLatitude: 47.620994,
      maxLatitude: 47.660533,
      minLongitude: 11.349174,
      maxLongitude: 11.37194,
    },
    waypoints: [
      { latitude: 47.62189, longitude: 11.349287, elevation: 867.0 },
      {
        latitude: 47.62149,
        longitude: 11.349174,
        elevation: 871.3827862546997,
      },
      {
        latitude: 47.620994,
        longitude: 11.349224,
        elevation: 873.9447164976659,
      },
      {
        latitude: 47.621036,
        longitude: 11.349447,
        elevation: 875.893450018181,
      },
      {
        latitude: 47.621877,
        longitude: 11.350225,
        elevation: 903.4163951837734,
      },
      {
        latitude: 47.622597,
        longitude: 11.351329,
        elevation: 936.7162637847225,
      },
      {
        latitude: 47.622223,
        longitude: 11.351332,
        elevation: 953.8665489788141,
      },
      {
        latitude: 47.622222,
        longitude: 11.351846,
        elevation: 976.7068428225518,
      },
      {
        latitude: 47.621882,
        longitude: 11.352751,
        elevation: 1016.5126492579247,
      },
      {
        latitude: 47.621982,
        longitude: 11.353205,
        elevation: 1034.38332887384,
      },
      {
        latitude: 47.621867,
        longitude: 11.353879,
        elevation: 1053.8560176222666,
      },
      {
        latitude: 47.621683,
        longitude: 11.355026,
        elevation: 1085.7018209162475,
      },
      {
        latitude: 47.622006,
        longitude: 11.355562,
        elevation: 1107.3615133383437,
      },
      {
        latitude: 47.622167,
        longitude: 11.356289,
        elevation: 1124.5705980981056,
      },
      {
        latitude: 47.622034,
        longitude: 11.357363,
        elevation: 1145.9359332605186,
      },
      {
        latitude: 47.622381,
        longitude: 11.357812,
        elevation: 1156.3429891735236,
      },
      {
        latitude: 47.622529,
        longitude: 11.358221,
        elevation: 1166.019276131544,
      },
      {
        latitude: 47.6227,
        longitude: 11.358567,
        elevation: 1178.0085053260273,
      },
      {
        latitude: 47.622667,
        longitude: 11.358958,
        elevation: 1192.3310702649615,
      },
      {
        latitude: 47.622526,
        longitude: 11.359156,
        elevation: 1204.7309424823543,
      },
      {
        latitude: 47.622572,
        longitude: 11.359394,
        elevation: 1217.0229388163275,
      },
      {
        latitude: 47.622651,
        longitude: 11.359473,
        elevation: 1221.4196460404885,
      },
      {
        latitude: 47.622722,
        longitude: 11.359571,
        elevation: 1225.5589120022435,
      },
      {
        latitude: 47.6226,
        longitude: 11.359694,
        elevation: 1229.3700723015945,
      },
      {
        latitude: 47.622503,
        longitude: 11.35981,
        elevation: 1233.101847307188,
      },
      {
        latitude: 47.622493,
        longitude: 11.359935,
        elevation: 1236.3870538985188,
      },
      {
        latitude: 47.622576,
        longitude: 11.360042,
        elevation: 1239.34788000349,
      },
      {
        latitude: 47.622546,
        longitude: 11.360184,
        elevation: 1243.145856901258,
      },
      {
        latitude: 47.622662,
        longitude: 11.36009,
        elevation: 1246.5860830864556,
      },
      {
        latitude: 47.622722,
        longitude: 11.360224,
        elevation: 1249.9933873644477,
      },
      {
        latitude: 47.62283,
        longitude: 11.360327,
        elevation: 1252.6893219287776,
      },
      {
        latitude: 47.622931,
        longitude: 11.360388,
        elevation: 1255.4264007494323,
      },
      {
        latitude: 47.622962,
        longitude: 11.36061,
        elevation: 1257.6271570323063,
      },
      { latitude: 47.623021, longitude: 11.36078, elevation: 1259.37896706589 },
      {
        latitude: 47.623096,
        longitude: 11.360895,
        elevation: 1260.3114165982024,
      },
      {
        latitude: 47.623181,
        longitude: 11.360982,
        elevation: 1260.65134266874,
      },
      {
        latitude: 47.62318,
        longitude: 11.36107,
        elevation: 1260.4753590223515,
      },
      {
        latitude: 47.623284,
        longitude: 11.361045,
        elevation: 1260.010773260287,
      },
      { latitude: 47.62338, longitude: 11.361, elevation: 1258.8862621809499 },
      {
        latitude: 47.623534,
        longitude: 11.360994,
        elevation: 1258.241124950569,
      },
      {
        latitude: 47.623534,
        longitude: 11.360994,
        elevation: 1259.0500784555375,
      },
      { latitude: 47.62338, longitude: 11.361, elevation: 1260.8936215410345 },
      {
        latitude: 47.623284,
        longitude: 11.361045,
        elevation: 1263.622447151794,
      },
      {
        latitude: 47.62318,
        longitude: 11.36107,
        elevation: 1265.9944575312088,
      },
      {
        latitude: 47.6231,
        longitude: 11.361184,
        elevation: 1268.6490869325544,
      },
      {
        latitude: 47.622933,
        longitude: 11.36134,
        elevation: 1270.6178365009418,
      },
      {
        latitude: 47.62287,
        longitude: 11.361385,
        elevation: 1272.7229948220634,
      },
      {
        latitude: 47.622805,
        longitude: 11.361335,
        elevation: 1273.8624167596572,
      },
      {
        latitude: 47.622725,
        longitude: 11.361291,
        elevation: 1275.0885620388278,
      },
      {
        latitude: 47.622629,
        longitude: 11.361269,
        elevation: 1276.3832000671132,
      },
      {
        latitude: 47.622627,
        longitude: 11.361408,
        elevation: 1277.5511643490931,
      },
      {
        latitude: 47.622622,
        longitude: 11.361507,
        elevation: 1281.2050081995085,
      },
      {
        latitude: 47.622094,
        longitude: 11.361611,
        elevation: 1288.1990744150726,
      },
      {
        latitude: 47.621746,
        longitude: 11.361755,
        elevation: 1296.0022253410816,
      },
      {
        latitude: 47.621603,
        longitude: 11.361793,
        elevation: 1304.5994487607918,
      },
      {
        latitude: 47.621574,
        longitude: 11.361961,
        elevation: 1309.485661584301,
      },
      {
        latitude: 47.621649,
        longitude: 11.362194,
        elevation: 1313.4357032581106,
      },
      {
        latitude: 47.621728,
        longitude: 11.362153,
        elevation: 1316.3024369028021,
      },
      {
        latitude: 47.621813,
        longitude: 11.362184,
        elevation: 1319.2833784189331,
      },
      {
        latitude: 47.621937,
        longitude: 11.362275,
        elevation: 1322.803021781659,
      },
      {
        latitude: 47.621995,
        longitude: 11.362448,
        elevation: 1327.089371109622,
      },
      {
        latitude: 47.622028,
        longitude: 11.36264,
        elevation: 1331.9740350049578,
      },
      {
        latitude: 47.622137,
        longitude: 11.362819,
        elevation: 1336.9292491388017,
      },
      {
        latitude: 47.622093,
        longitude: 11.363015,
        elevation: 1341.1801511104827,
      },
      {
        latitude: 47.622118,
        longitude: 11.363112,
        elevation: 1345.779351618512,
      },
      {
        latitude: 47.622256,
        longitude: 11.363297,
        elevation: 1349.6075528138365,
      },
      {
        latitude: 47.622422,
        longitude: 11.363432,
        elevation: 1354.7897994116365,
      },
      {
        latitude: 47.622498,
        longitude: 11.363692,
        elevation: 1359.5936852885227,
      },
      {
        latitude: 47.622626,
        longitude: 11.363969,
        elevation: 1363.1308393982467,
      },
      {
        latitude: 47.622713,
        longitude: 11.363976,
        elevation: 1365.510025778142,
      },
      {
        latitude: 47.622764,
        longitude: 11.364062,
        elevation: 1366.3539088358732,
      },
      {
        latitude: 47.62282,
        longitude: 11.364077,
        elevation: 1367.3997511508771,
      },
      {
        latitude: 47.622803,
        longitude: 11.364212,
        elevation: 1368.4939172688537,
      },
      {
        latitude: 47.62287,
        longitude: 11.364161,
        elevation: 1369.7780443670881,
      },
      {
        latitude: 47.622907,
        longitude: 11.364265,
        elevation: 1370.6496577909247,
      },
      {
        latitude: 47.622945,
        longitude: 11.364237,
        elevation: 1371.9282574698177,
      },
      {
        latitude: 47.623003,
        longitude: 11.36449,
        elevation: 1372.6494205604815,
      },
      {
        latitude: 47.623042,
        longitude: 11.364538,
        elevation: 1374.325394817912,
      },
      {
        latitude: 47.623083,
        longitude: 11.364859,
        elevation: 1375.7469929091426,
      },
      {
        latitude: 47.623187,
        longitude: 11.364785,
        elevation: 1379.5839325468764,
      },
      {
        latitude: 47.623247,
        longitude: 11.365109,
        elevation: 1382.7619071327417,
      },
      {
        latitude: 47.623282,
        longitude: 11.365243,
        elevation: 1387.8212565169376,
      },
      {
        latitude: 47.62334,
        longitude: 11.365401,
        elevation: 1391.6874554841656,
      },
      {
        latitude: 47.62342,
        longitude: 11.365519,
        elevation: 1396.375028256548,
      },
      {
        latitude: 47.62349,
        longitude: 11.365657,
        elevation: 1401.7441259711604,
      },
      {
        latitude: 47.623575,
        longitude: 11.365954,
        elevation: 1407.5712002829875,
      },
      {
        latitude: 47.623635,
        longitude: 11.366265,
        elevation: 1412.2570294035013,
      },
      {
        latitude: 47.623684,
        longitude: 11.366254,
        elevation: 1418.6268692655076,
      },
      {
        latitude: 47.623793,
        longitude: 11.366558,
        elevation: 1424.0325367310427,
      },
      {
        latitude: 47.623964,
        longitude: 11.366939,
        elevation: 1429.924066237631,
      },
      {
        latitude: 47.62403,
        longitude: 11.366949,
        elevation: 1436.3806988279057,
      },
      {
        latitude: 47.624092,
        longitude: 11.367215,
        elevation: 1439.3808672030605,
      },
      {
        latitude: 47.624102,
        longitude: 11.367257,
        elevation: 1445.8219068139078,
      },
      {
        latitude: 47.624194,
        longitude: 11.367509,
        elevation: 1450.2121084321138,
      },
      {
        latitude: 47.624236,
        longitude: 11.367698,
        elevation: 1455.0600635291412,
      },
      {
        latitude: 47.624251,
        longitude: 11.367736,
        elevation: 1459.5442459559467,
      },
      {
        latitude: 47.624312,
        longitude: 11.367901,
        elevation: 1463.1740461504455,
      },
      {
        latitude: 47.624373,
        longitude: 11.368115,
        elevation: 1467.380350356209,
      },
      {
        latitude: 47.624435,
        longitude: 11.368278,
        elevation: 1470.6146489179173,
      },
      {
        latitude: 47.624491,
        longitude: 11.368281,
        elevation: 1473.6788211721496,
      },
      {
        latitude: 47.62447,
        longitude: 11.368558,
        elevation: 1478.2384217663957,
      },
      {
        latitude: 47.624512,
        longitude: 11.368958,
        elevation: 1483.0671869124908,
      },
      {
        latitude: 47.624537,
        longitude: 11.369141,
        elevation: 1487.7274384519524,
      },
      {
        latitude: 47.624578,
        longitude: 11.369196,
        elevation: 1491.1427982708153,
      },
      {
        latitude: 47.624579,
        longitude: 11.369383,
        elevation: 1493.785395771772,
      },
      {
        latitude: 47.624604,
        longitude: 11.369508,
        elevation: 1497.1559929552363,
      },
      { latitude: 47.624661, longitude: 11.3694, elevation: 1499.967542667488 },
      {
        latitude: 47.624657,
        longitude: 11.369511,
        elevation: 1502.9278859743322,
      },
      {
        latitude: 47.624682,
        longitude: 11.369667,
        elevation: 1505.382825589717,
      },
      {
        latitude: 47.624732,
        longitude: 11.369586,
        elevation: 1507.8611296798342,
      },
      {
        latitude: 47.624742,
        longitude: 11.369693,
        elevation: 1510.6142161343423,
      },
      {
        latitude: 47.624839,
        longitude: 11.369561,
        elevation: 1511.7701893761998,
      },
      {
        latitude: 47.624876,
        longitude: 11.369602,
        elevation: 1511.3670532549615,
      },
      {
        latitude: 47.625025,
        longitude: 11.369438,
        elevation: 1512.1383136596264,
      },
      {
        latitude: 47.625119,
        longitude: 11.369485,
        elevation: 1521.2653930723227,
      },
      {
        latitude: 47.625199,
        longitude: 11.370183,
        elevation: 1529.9222048521215,
      },
      {
        latitude: 47.625342,
        longitude: 11.370567,
        elevation: 1540.973722181737,
      },
      { latitude: 47.62539, longitude: 11.37074, elevation: 1543.997554069948 },
      {
        latitude: 47.625416,
        longitude: 11.370974,
        elevation: 1546.0174011995002,
      },
      {
        latitude: 47.625495,
        longitude: 11.371172,
        elevation: 1548.4590249359471,
      },
      {
        latitude: 47.625564,
        longitude: 11.371407,
        elevation: 1550.7708471498927,
      },
      {
        latitude: 47.625668,
        longitude: 11.371628,
        elevation: 1553.1259776245422,
      },
      {
        latitude: 47.625828,
        longitude: 11.371791,
        elevation: 1553.9055261404048,
      },
      {
        latitude: 47.625966,
        longitude: 11.371955,
        elevation: 1554.3573416848185,
      },
      {
        latitude: 47.626005,
        longitude: 11.372099,
        elevation: 1551.2971796465472,
      },
      {
        latitude: 47.626269,
        longitude: 11.372951,
        elevation: 1545.8600159574798,
      },
      {
        latitude: 47.626467,
        longitude: 11.37325,
        elevation: 1537.2306608991971,
      },
      {
        latitude: 47.626697,
        longitude: 11.373408,
        elevation: 1530.5301757952716,
      },
      {
        latitude: 47.626695,
        longitude: 11.373494,
        elevation: 1524.8833778493804,
      },
      {
        latitude: 47.626795,
        longitude: 11.373512,
        elevation: 1523.1120881874303,
      },
      {
        latitude: 47.626779,
        longitude: 11.373593,
        elevation: 1520.4656579455961,
      },
      {
        latitude: 47.626879,
        longitude: 11.373569,
        elevation: 1518.650284765295,
      },
      {
        latitude: 47.626871,
        longitude: 11.373615,
        elevation: 1516.485378789786,
      },
      {
        latitude: 47.62692,
        longitude: 11.37362,
        elevation: 1515.3850373953364,
      },
      {
        latitude: 47.626934,
        longitude: 11.373656,
        elevation: 1514.055315006015,
      },
      {
        latitude: 47.626968,
        longitude: 11.373655,
        elevation: 1512.6727833701377,
      },
      {
        latitude: 47.626957,
        longitude: 11.373729,
        elevation: 1511.169818107373,
      },
      {
        latitude: 47.626997,
        longitude: 11.373716,
        elevation: 1509.6202093171323,
      },
      {
        latitude: 47.627029,
        longitude: 11.373719,
        elevation: 1508.4981099950064,
      },
      {
        latitude: 47.627021,
        longitude: 11.373743,
        elevation: 1507.487407414627,
      },
      {
        latitude: 47.627046,
        longitude: 11.373756,
        elevation: 1506.5096682709236,
      },
      {
        latitude: 47.627076,
        longitude: 11.373732,
        elevation: 1505.4885613270385,
      },
      {
        latitude: 47.627092,
        longitude: 11.37376,
        elevation: 1504.3964015141728,
      },
      {
        latitude: 47.627074,
        longitude: 11.373789,
        elevation: 1503.5717155627462,
      },
      {
        latitude: 47.627077,
        longitude: 11.373814,
        elevation: 1502.477197696066,
      },
      {
        latitude: 47.627115,
        longitude: 11.373811,
        elevation: 1501.3049239431941,
      },
      {
        latitude: 47.627125,
        longitude: 11.373861,
        elevation: 1499.6480536783079,
      },
      {
        latitude: 47.627096,
        longitude: 11.373908,
        elevation: 1498.2366672526182,
      },
      {
        latitude: 47.62711,
        longitude: 11.373933,
        elevation: 1495.5272902369359,
      },
      {
        latitude: 47.627206,
        longitude: 11.373952,
        elevation: 1493.9710952653222,
      },
      { latitude: 47.6272, longitude: 11.373971, elevation: 1490.972669518839 },
      {
        latitude: 47.627243,
        longitude: 11.374019,
        elevation: 1488.7542131635928,
      },
      {
        latitude: 47.627305,
        longitude: 11.374054,
        elevation: 1484.372588791169,
      },
      {
        latitude: 47.627416,
        longitude: 11.374308,
        elevation: 1480.7114456143354,
      },
      {
        latitude: 47.627367,
        longitude: 11.374407,
        elevation: 1475.4533642009042,
      },
      {
        latitude: 47.627425,
        longitude: 11.374547,
        elevation: 1471.4743706672734,
      },
      {
        latitude: 47.6275,
        longitude: 11.374637,
        elevation: 1467.1948458252514,
      },
      {
        latitude: 47.627559,
        longitude: 11.374639,
        elevation: 1464.6827583812924,
      },
      {
        latitude: 47.627561,
        longitude: 11.374639,
        elevation: 1462.5815590631787,
      },
      {
        latitude: 47.627608,
        longitude: 11.374641,
        elevation: 1458.7101469422066,
      },
      {
        latitude: 47.627786,
        longitude: 11.374752,
        elevation: 1453.119485461204,
      },
      {
        latitude: 47.627954,
        longitude: 11.374798,
        elevation: 1446.1374242262825,
      },
      {
        latitude: 47.628068,
        longitude: 11.37485,
        elevation: 1440.9445679758765,
      },
      {
        latitude: 47.628113,
        longitude: 11.374919,
        elevation: 1436.3786737962819,
      },
      {
        latitude: 47.62825,
        longitude: 11.374958,
        elevation: 1432.9628781380716,
      },
      {
        latitude: 47.628376,
        longitude: 11.375062,
        elevation: 1429.8183530113538,
      },
      {
        latitude: 47.628442,
        longitude: 11.375064,
        elevation: 1427.9789739826326,
      },
      {
        latitude: 47.628461,
        longitude: 11.375047,
        elevation: 1426.951837795304,
      },
      {
        latitude: 47.62847,
        longitude: 11.375096,
        elevation: 1426.1074473517492,
      },
      {
        latitude: 47.628533,
        longitude: 11.375103,
        elevation: 1425.3733744232502,
      },
      {
        latitude: 47.628529,
        longitude: 11.375137,
        elevation: 1424.1404874267118,
      },
      {
        latitude: 47.628615,
        longitude: 11.375155,
        elevation: 1423.1785368517471,
      },
      {
        latitude: 47.628644,
        longitude: 11.375232,
        elevation: 1421.5302920417007,
      },
      {
        latitude: 47.628716,
        longitude: 11.375334,
        elevation: 1420.070453175455,
      },
      {
        latitude: 47.62877,
        longitude: 11.375369,
        elevation: 1418.2553621904194,
      },
      {
        latitude: 47.628837,
        longitude: 11.37534,
        elevation: 1416.3838922179239,
      },
      {
        latitude: 47.628915,
        longitude: 11.375378,
        elevation: 1414.1226472924172,
      },
      {
        latitude: 47.628971,
        longitude: 11.375504,
        elevation: 1411.7470071277394,
      },
      {
        latitude: 47.629039,
        longitude: 11.375561,
        elevation: 1408.2205370162305,
      },
      {
        latitude: 47.629171,
        longitude: 11.375694,
        elevation: 1405.0881786927548,
      },
      {
        latitude: 47.629229,
        longitude: 11.375821,
        elevation: 1402.3628165352939,
      },
      {
        latitude: 47.629255,
        longitude: 11.37582,
        elevation: 1400.2125289478172,
      },
      {
        latitude: 47.629347,
        longitude: 11.37597,
        elevation: 1398.9333765373885,
      },
      {
        latitude: 47.629398,
        longitude: 11.376106,
        elevation: 1394.7410113349517,
      },
      {
        latitude: 47.629442,
        longitude: 11.376503,
        elevation: 1390.742929025621,
      },
      {
        latitude: 47.629533,
        longitude: 11.376711,
        elevation: 1384.9880671844035,
      },
      {
        latitude: 47.6296,
        longitude: 11.376968,
        elevation: 1379.5854675400742,
      },
      {
        latitude: 47.629715,
        longitude: 11.377313,
        elevation: 1374.4182676572846,
      },
      {
        latitude: 47.629669,
        longitude: 11.377552,
        elevation: 1370.4020075357676,
      },
      {
        latitude: 47.629694,
        longitude: 11.377585,
        elevation: 1366.6812045746178,
      },
      {
        latitude: 47.62979,
        longitude: 11.377446,
        elevation: 1364.2505374333532,
      },
      {
        latitude: 47.629849,
        longitude: 11.377586,
        elevation: 1358.8647041688928,
      },
      {
        latitude: 47.629938,
        longitude: 11.37786,
        elevation: 1354.1976130957187,
      },
      {
        latitude: 47.630027,
        longitude: 11.377966,
        elevation: 1348.343336365649,
      },
      {
        latitude: 47.630118,
        longitude: 11.378145,
        elevation: 1345.1193176117224,
      },
      {
        latitude: 47.630166,
        longitude: 11.378154,
        elevation: 1342.1500353494434,
      },
      {
        latitude: 47.630207,
        longitude: 11.378257,
        elevation: 1340.36542165963,
      },
      {
        latitude: 47.630241,
        longitude: 11.378246,
        elevation: 1337.8020748837612,
      },
      {
        latitude: 47.630272,
        longitude: 11.378318,
        elevation: 1335.2712847823514,
      },
      {
        latitude: 47.630237,
        longitude: 11.378377,
        elevation: 1332.1210231327432,
      },
      {
        latitude: 47.630268,
        longitude: 11.378455,
        elevation: 1329.1351973198302,
      },
      {
        latitude: 47.630308,
        longitude: 11.378494,
        elevation: 1325.305247252299,
      },
      {
        latitude: 47.630438,
        longitude: 11.378457,
        elevation: 1321.4171367875783,
      },
      {
        latitude: 47.630514,
        longitude: 11.378597,
        elevation: 1317.2041079245623,
      },
      {
        latitude: 47.630517,
        longitude: 11.378742,
        elevation: 1314.2990422970393,
      },
      {
        latitude: 47.630536,
        longitude: 11.378737,
        elevation: 1310.1298395079252,
      },
      {
        latitude: 47.630528,
        longitude: 11.378901,
        elevation: 1305.6609541413982,
      },
      {
        latitude: 47.630624,
        longitude: 11.37901,
        elevation: 1299.461700237402,
      },
      {
        latitude: 47.630678,
        longitude: 11.379135,
        elevation: 1293.1743007844752,
      },
      {
        latitude: 47.630653,
        longitude: 11.379382,
        elevation: 1287.2765612530645,
      },
      {
        latitude: 47.630824,
        longitude: 11.379385,
        elevation: 1279.006838777183,
      },
      {
        latitude: 47.630916,
        longitude: 11.379131,
        elevation: 1273.2079366472838,
      },
      {
        latitude: 47.63096,
        longitude: 11.379111,
        elevation: 1267.6506748377992,
      },
      {
        latitude: 47.630959,
        longitude: 11.379083,
        elevation: 1264.7321093959577,
      },
      {
        latitude: 47.631046,
        longitude: 11.379054,
        elevation: 1263.1741073460305,
      },
      {
        latitude: 47.631048,
        longitude: 11.379027,
        elevation: 1260.2982268624892,
      },
      {
        latitude: 47.631089,
        longitude: 11.378978,
        elevation: 1258.6799944243326,
      },
      {
        latitude: 47.631127,
        longitude: 11.378958,
        elevation: 1257.0491605385464,
      },
      {
        latitude: 47.631127,
        longitude: 11.378939,
        elevation: 1255.634609925231,
      },
      {
        latitude: 47.631154,
        longitude: 11.378931,
        elevation: 1254.016954560557,
      },
      {
        latitude: 47.631203,
        longitude: 11.378978,
        elevation: 1251.8263946899688,
      },
      {
        latitude: 47.631269,
        longitude: 11.37901,
        elevation: 1249.3799297654023,
      },
      {
        latitude: 47.631327,
        longitude: 11.378989,
        elevation: 1247.018934100602,
      },
      {
        latitude: 47.631375,
        longitude: 11.379056,
        elevation: 1245.3174836933747,
      },
      {
        latitude: 47.631393,
        longitude: 11.379007,
        elevation: 1243.8840676270024,
      },
      {
        latitude: 47.631418,
        longitude: 11.379009,
        elevation: 1243.0031344472372,
      },
      {
        latitude: 47.631422,
        longitude: 11.378984,
        elevation: 1240.333829485767,
      },
      {
        latitude: 47.631546,
        longitude: 11.379158,
        elevation: 1234.4688328662742,
      },
      {
        latitude: 47.631867,
        longitude: 11.379078,
        elevation: 1229.0830334645102,
      },
      { latitude: 47.631881, longitude: 11.379, elevation: 1222.498660413957 },
      {
        latitude: 47.631979,
        longitude: 11.378994,
        elevation: 1219.7304045076905,
      },
      {
        latitude: 47.632137,
        longitude: 11.378922,
        elevation: 1216.2162031104187,
      },
      {
        latitude: 47.632343,
        longitude: 11.378849,
        elevation: 1212.8796426445706,
      },
      {
        latitude: 47.632615,
        longitude: 11.37889,
        elevation: 1210.3934789288883,
      },
      {
        latitude: 47.632613,
        longitude: 11.378989,
        elevation: 1206.5845450367442,
      },
      {
        latitude: 47.633035,
        longitude: 11.379005,
        elevation: 1201.5613058904642,
      },
      {
        latitude: 47.633611,
        longitude: 11.379253,
        elevation: 1197.306208479052,
      },
      {
        latitude: 47.634171,
        longitude: 11.379397,
        elevation: 1193.4199562985452,
      },
      {
        latitude: 47.634479,
        longitude: 11.379322,
        elevation: 1193.874500804827,
      },
      {
        latitude: 47.634647,
        longitude: 11.379254,
        elevation: 1195.7386553046003,
      },
      {
        latitude: 47.634778,
        longitude: 11.379169,
        elevation: 1197.9254242050235,
      },
      {
        latitude: 47.634764,
        longitude: 11.379065,
        elevation: 1202.4791536674256,
      },
      {
        latitude: 47.635006,
        longitude: 11.378806,
        elevation: 1205.5275108562053,
      },
      {
        latitude: 47.635102,
        longitude: 11.378558,
        elevation: 1210.85339637649,
      },
      {
        latitude: 47.635211,
        longitude: 11.378376,
        elevation: 1214.155528278389,
      },
      {
        latitude: 47.635295,
        longitude: 11.378298,
        elevation: 1219.33891709517,
      },
      {
        latitude: 47.635459,
        longitude: 11.378184,
        elevation: 1223.7934399423532,
      },
      {
        latitude: 47.635566,
        longitude: 11.378098,
        elevation: 1233.941632773337,
      },
      {
        latitude: 47.635876,
        longitude: 11.377695,
        elevation: 1244.7669573727212,
      },
      {
        latitude: 47.636161,
        longitude: 11.377507,
        elevation: 1254.7020994595373,
      },
      {
        latitude: 47.636253,
        longitude: 11.377432,
        elevation: 1262.6612848694858,
      },
      {
        latitude: 47.636342,
        longitude: 11.377336,
        elevation: 1266.817656984216,
      },
      {
        latitude: 47.636473,
        longitude: 11.377328,
        elevation: 1271.5287187357512,
      },
      { latitude: 47.636584, longitude: 11.37739, elevation: 1275.83319018529 },
      {
        latitude: 47.63668,
        longitude: 11.37734,
        elevation: 1278.2367487510244,
      },
      {
        latitude: 47.636759,
        longitude: 11.377232,
        elevation: 1280.4925538136113,
      },
      {
        latitude: 47.636924,
        longitude: 11.377213,
        elevation: 1281.399033398617,
      },
      {
        latitude: 47.637015,
        longitude: 11.377134,
        elevation: 1279.3543099672142,
      },
      {
        latitude: 47.637322,
        longitude: 11.376516,
        elevation: 1275.8429357638183,
      },
      {
        latitude: 47.637848,
        longitude: 11.376718,
        elevation: 1273.1529637313984,
      },
      {
        latitude: 47.637996,
        longitude: 11.377023,
        elevation: 1269.9833583293669,
      },
      {
        latitude: 47.638115,
        longitude: 11.377221,
        elevation: 1270.8611982153566,
      },
      {
        latitude: 47.638218,
        longitude: 11.377319,
        elevation: 1268.543393301064,
      },
      {
        latitude: 47.638355,
        longitude: 11.377334,
        elevation: 1267.9002180449115,
      },
      {
        latitude: 47.638472,
        longitude: 11.377242,
        elevation: 1265.3389875033013,
      },
      {
        latitude: 47.638657,
        longitude: 11.377007,
        elevation: 1261.8619261271706,
      },
      {
        latitude: 47.63896,
        longitude: 11.376675,
        elevation: 1257.5963105245082,
      },
      {
        latitude: 47.639149,
        longitude: 11.376547,
        elevation: 1255.8023274799948,
      },
      {
        latitude: 47.639233,
        longitude: 11.376477,
        elevation: 1253.1516981407094,
      },
      {
        latitude: 47.639296,
        longitude: 11.376398,
        elevation: 1252.5538334856235,
      },
      {
        latitude: 47.639335,
        longitude: 11.376307,
        elevation: 1248.3670734527298,
      },
      {
        latitude: 47.639393,
        longitude: 11.376105,
        elevation: 1246.2815229457808,
      },
      {
        latitude: 47.639384,
        longitude: 11.376058,
        elevation: 1244.833992075258,
      },
      {
        latitude: 47.639478,
        longitude: 11.376161,
        elevation: 1245.723043016247,
      },
      {
        latitude: 47.639514,
        longitude: 11.376199,
        elevation: 1247.477166391471,
      },
      {
        latitude: 47.639635,
        longitude: 11.376263,
        elevation: 1246.563698777173,
      },
      {
        latitude: 47.639871,
        longitude: 11.376322,
        elevation: 1245.3100464420106,
      },
      {
        latitude: 47.640048,
        longitude: 11.376223,
        elevation: 1240.3678455387321,
      },
      {
        latitude: 47.640267,
        longitude: 11.376076,
        elevation: 1236.9369702056797,
      },
      {
        latitude: 47.640503,
        longitude: 11.376144,
        elevation: 1231.6769188734434,
      },
      {
        latitude: 47.64061,
        longitude: 11.376278,
        elevation: 1227.4912657362202,
      },
      {
        latitude: 47.640686,
        longitude: 11.376157,
        elevation: 1221.0288893322613,
      },
      {
        latitude: 47.640807,
        longitude: 11.376296,
        elevation: 1209.3075974569124,
      },
      {
        latitude: 47.641069,
        longitude: 11.376034,
        elevation: 1199.43214699544,
      },
      {
        latitude: 47.641185,
        longitude: 11.375942,
        elevation: 1187.2035345459183,
      },
      {
        latitude: 47.641191,
        longitude: 11.376148,
        elevation: 1181.0880762093202,
      },
      {
        latitude: 47.641259,
        longitude: 11.376106,
        elevation: 1175.7823019209864,
      },
      {
        latitude: 47.641297,
        longitude: 11.37617,
        elevation: 1169.5256445385085,
      },
      {
        latitude: 47.641437,
        longitude: 11.376093,
        elevation: 1165.3185716489984,
      },
      {
        latitude: 47.641433,
        longitude: 11.37617,
        elevation: 1159.8044336728972,
      },
      {
        latitude: 47.641517,
        longitude: 11.376139,
        elevation: 1157.0333492885918,
      },
      {
        latitude: 47.641526,
        longitude: 11.376251,
        elevation: 1153.9174714075887,
      },
      {
        latitude: 47.641602,
        longitude: 11.376238,
        elevation: 1147.9776262489781,
      },
      {
        latitude: 47.641708,
        longitude: 11.375871,
        elevation: 1141.4360734043573,
      },
      {
        latitude: 47.641879,
        longitude: 11.375802,
        elevation: 1132.3336049888767,
      },
      {
        latitude: 47.641964,
        longitude: 11.376042,
        elevation: 1121.61130888957,
      },
      {
        latitude: 47.642249,
        longitude: 11.375825,
        elevation: 1114.8763078210864,
      },
      {
        latitude: 47.642321,
        longitude: 11.375933,
        elevation: 1103.4551854165961,
      },
      {
        latitude: 47.642489,
        longitude: 11.375574,
        elevation: 1096.3092528136167,
      },
      {
        latitude: 47.642429,
        longitude: 11.375376,
        elevation: 1081.505635592644,
      },
      {
        latitude: 47.642423,
        longitude: 11.374963,
        elevation: 1068.928931948468,
      },
      {
        latitude: 47.642555,
        longitude: 11.374965,
        elevation: 1054.3877732816422,
      },
      {
        latitude: 47.642565,
        longitude: 11.374675,
        elevation: 1041.5138985850126,
      },
      {
        latitude: 47.642719,
        longitude: 11.3744,
        elevation: 1032.1889290975664,
      },
      {
        latitude: 47.642805,
        longitude: 11.374504,
        elevation: 1024.5007445046708,
      },
      {
        latitude: 47.642844,
        longitude: 11.37443,
        elevation: 1020.102261479159,
      },
      {
        latitude: 47.642915,
        longitude: 11.374567,
        elevation: 1013.5013181554646,
      },
      {
        latitude: 47.643005,
        longitude: 11.374288,
        elevation: 1006.3820867678088,
      },
      {
        latitude: 47.643121,
        longitude: 11.37443,
        elevation: 999.4173317211184,
      },
      {
        latitude: 47.643187,
        longitude: 11.374324,
        elevation: 995.0288038697481,
      },
      {
        latitude: 47.643287,
        longitude: 11.374317,
        elevation: 992.4442014980773,
      },
      {
        latitude: 47.643283,
        longitude: 11.374232,
        elevation: 987.3661890169556,
      },
      {
        latitude: 47.643439,
        longitude: 11.374081,
        elevation: 983.0415714673818,
      },
      {
        latitude: 47.643512,
        longitude: 11.374124,
        elevation: 977.8688092509171,
      },
      {
        latitude: 47.643571,
        longitude: 11.374099,
        elevation: 974.3311347700574,
      },
      {
        latitude: 47.643546,
        longitude: 11.373912,
        elevation: 970.7697672915392,
      },
      {
        latitude: 47.643691,
        longitude: 11.37396,
        elevation: 966.1495448094366,
      },
      {
        latitude: 47.643694,
        longitude: 11.373751,
        elevation: 960.9341608941692,
      },
      {
        latitude: 47.643634,
        longitude: 11.373538,
        elevation: 954.7946089358137,
      },
      {
        latitude: 47.643481,
        longitude: 11.37306,
        elevation: 949.2316202086299,
      },
      {
        latitude: 47.643686,
        longitude: 11.372995,
        elevation: 944.7006030676423,
      },
      {
        latitude: 47.64377,
        longitude: 11.373028,
        elevation: 941.5596709370504,
      },
      {
        latitude: 47.643835,
        longitude: 11.372805,
        elevation: 940.3708790625624,
      },
      {
        latitude: 47.643768,
        longitude: 11.372425,
        elevation: 939.1890138733885,
      },
      {
        latitude: 47.643713,
        longitude: 11.372398,
        elevation: 938.4526732358734,
      },
      {
        latitude: 47.643705,
        longitude: 11.372162,
        elevation: 938.3999925487981,
      },
      {
        latitude: 47.643748,
        longitude: 11.372023,
        elevation: 939.3362677484199,
      },
      {
        latitude: 47.643889,
        longitude: 11.371686,
        elevation: 939.8931777179077,
      },
      {
        latitude: 47.643958,
        longitude: 11.371596,
        elevation: 940.2145557134324,
      },
      {
        latitude: 47.644055,
        longitude: 11.371545,
        elevation: 939.5820632706478,
      },
      {
        latitude: 47.64406,
        longitude: 11.371599,
        elevation: 939.8362886569978,
      },
      {
        latitude: 47.644116,
        longitude: 11.371691,
        elevation: 941.3388527219831,
      },
      {
        latitude: 47.644178,
        longitude: 11.371687,
        elevation: 942.9335229987418,
      },
      {
        latitude: 47.644209,
        longitude: 11.37171,
        elevation: 947.2170918279342,
      },
      {
        latitude: 47.644212,
        longitude: 11.372107,
        elevation: 950.0584009106442,
      },
      {
        latitude: 47.644261,
        longitude: 11.372163,
        elevation: 954.6334790204774,
      },
      {
        latitude: 47.644267,
        longitude: 11.37227,
        elevation: 956.4617258630772,
      },
      {
        latitude: 47.644231,
        longitude: 11.37242,
        elevation: 958.5877946129708,
      },
      {
        latitude: 47.644252,
        longitude: 11.372655,
        elevation: 959.8442134662962,
      },
      {
        latitude: 47.644272,
        longitude: 11.372688,
        elevation: 961.3090286146712,
      },
      {
        latitude: 47.644337,
        longitude: 11.372753,
        elevation: 961.7089957515379,
      },
      {
        latitude: 47.644337,
        longitude: 11.372753,
        elevation: 962.0926547938009,
      },
      {
        latitude: 47.644272,
        longitude: 11.372688,
        elevation: 962.0309058395478,
      },
      {
        latitude: 47.644252,
        longitude: 11.372655,
        elevation: 961.8047603484429,
      },
      {
        latitude: 47.644231,
        longitude: 11.37242,
        elevation: 961.2621854321076,
      },
      {
        latitude: 47.644267,
        longitude: 11.37227,
        elevation: 960.2176940776576,
      },
      {
        latitude: 47.644261,
        longitude: 11.372163,
        elevation: 958.8525390074356,
      },
      {
        latitude: 47.644212,
        longitude: 11.372107,
        elevation: 955.3699043904631,
      },
      {
        latitude: 47.644209,
        longitude: 11.37171,
        elevation: 952.9528713881084,
      },
      {
        latitude: 47.644178,
        longitude: 11.371687,
        elevation: 949.1121332982958,
      },
      {
        latitude: 47.644116,
        longitude: 11.371691,
        elevation: 946.615804152337,
      },
      {
        latitude: 47.64406,
        longitude: 11.371599,
        elevation: 944.7459789010602,
      },
      {
        latitude: 47.644055,
        longitude: 11.371545,
        elevation: 942.9096197551476,
      },
      {
        latitude: 47.643958,
        longitude: 11.371596,
        elevation: 942.2580201081453,
      },
      {
        latitude: 47.643889,
        longitude: 11.371686,
        elevation: 940.7520098144747,
      },
      {
        latitude: 47.643748,
        longitude: 11.372023,
        elevation: 939.5078169408766,
      },
      {
        latitude: 47.643705,
        longitude: 11.372162,
        elevation: 938.2379068372504,
      },
      {
        latitude: 47.643713,
        longitude: 11.372398,
        elevation: 937.8107266662728,
      },
      {
        latitude: 47.643768,
        longitude: 11.372425,
        elevation: 937.9510647323586,
      },
      {
        latitude: 47.643835,
        longitude: 11.372805,
        elevation: 937.6380263341736,
      },
      {
        latitude: 47.64377,
        longitude: 11.373028,
        elevation: 935.8630869065958,
      },
      {
        latitude: 47.643978,
        longitude: 11.37315,
        elevation: 932.3563348260275,
      },
      {
        latitude: 47.644178,
        longitude: 11.373435,
        elevation: 925.0533901504818,
      },
      {
        latitude: 47.644436,
        longitude: 11.373897,
        elevation: 915.0041912565111,
      },
      {
        latitude: 47.644763,
        longitude: 11.374145,
        elevation: 904.4055681176626,
      },
      {
        latitude: 47.644907,
        longitude: 11.374243,
        elevation: 892.0572233362684,
      },
      {
        latitude: 47.645137,
        longitude: 11.374441,
        elevation: 878.6236019972961,
      },
      {
        latitude: 47.645398,
        longitude: 11.374718,
        elevation: 863.2477556327483,
      },
      {
        latitude: 47.645719,
        longitude: 11.374627,
        elevation: 849.7976349274969,
      },
      {
        latitude: 47.645818,
        longitude: 11.374932,
        elevation: 837.9495884748915,
      },
      {
        latitude: 47.646061,
        longitude: 11.374722,
        elevation: 830.3560472905878,
      },
      {
        latitude: 47.646262,
        longitude: 11.374721,
        elevation: 820.343870811478,
      },
      {
        latitude: 47.646557,
        longitude: 11.374812,
        elevation: 808.0925729484259,
      },
      {
        latitude: 47.64694,
        longitude: 11.375357,
        elevation: 797.6971399122817,
      },
      {
        latitude: 47.647022,
        longitude: 11.375641,
        elevation: 788.163395629917,
      },
      {
        latitude: 47.647162,
        longitude: 11.375788,
        elevation: 784.5660002044717,
      },
      {
        latitude: 47.647181,
        longitude: 11.375704,
        elevation: 782.1084609772831,
      },
      {
        latitude: 47.647326,
        longitude: 11.375691,
        elevation: 780.3854498319654,
      },
      {
        latitude: 47.647662,
        longitude: 11.376082,
        elevation: 778.7833732309496,
      },
      {
        latitude: 47.64782,
        longitude: 11.376183,
        elevation: 776.7114591765544,
      },
      {
        latitude: 47.648252,
        longitude: 11.376692,
        elevation: 773.8516828652357,
      },
      {
        latitude: 47.648454,
        longitude: 11.376838,
        elevation: 769.967368395208,
      },
      {
        latitude: 47.648761,
        longitude: 11.37718,
        elevation: 765.8829879516738,
      },
      {
        latitude: 47.64912,
        longitude: 11.377729,
        elevation: 762.0034059200486,
      },
      {
        latitude: 47.649389,
        longitude: 11.378252,
        elevation: 758.1192682820906,
      },
      {
        latitude: 47.649506,
        longitude: 11.378274,
        elevation: 755.5077162261828,
      },
      {
        latitude: 47.649563,
        longitude: 11.378186,
        elevation: 753.3761188058497,
      },
      {
        latitude: 47.649545,
        longitude: 11.378034,
        elevation: 752.6659290057758,
      },
      {
        latitude: 47.64935,
        longitude: 11.377684,
        elevation: 751.0963971522275,
      },
      {
        latitude: 47.649088,
        longitude: 11.377053,
        elevation: 748.575199115995,
      },
      {
        latitude: 47.648995,
        longitude: 11.376706,
        elevation: 745.8013992795782,
      },
      {
        latitude: 47.648981,
        longitude: 11.376398,
        elevation: 742.8475131166847,
      },
      {
        latitude: 47.648982,
        longitude: 11.376032,
        elevation: 739.8735569703575,
      },
      {
        latitude: 47.649079,
        longitude: 11.375537,
        elevation: 737.3414055368397,
      },
      {
        latitude: 47.649308,
        longitude: 11.376482,
        elevation: 737.1026035471031,
      },
      {
        latitude: 47.649681,
        longitude: 11.377554,
        elevation: 734.9598714885565,
      },
      {
        latitude: 47.650122,
        longitude: 11.378208,
        elevation: 735.6372941963357,
      },
      {
        latitude: 47.650212,
        longitude: 11.378563,
        elevation: 733.3609123694425,
      },
      { latitude: 47.650339, longitude: 11.378927, elevation: 733.35829138315 },
      { latitude: 47.650551, longitude: 11.3791, elevation: 735.6284414783177 },
      {
        latitude: 47.650817,
        longitude: 11.379546,
        elevation: 738.6457290987244,
      },
      {
        latitude: 47.650825,
        longitude: 11.379843,
        elevation: 743.5420001124037,
      },
      {
        latitude: 47.650762,
        longitude: 11.380067,
        elevation: 746.6191122983648,
      },
      {
        latitude: 47.650716,
        longitude: 11.380117,
        elevation: 749.5677313923078,
      },
      { latitude: 47.650601, longitude: 11.3803, elevation: 753.7926171865261 },
      {
        latitude: 47.650449,
        longitude: 11.380798,
        elevation: 757.5396466433924,
      },
      {
        latitude: 47.650371,
        longitude: 11.380934,
        elevation: 761.8730978958768,
      },
      {
        latitude: 47.650281,
        longitude: 11.381049,
        elevation: 765.063748651727,
      },
      {
        latitude: 47.650244,
        longitude: 11.381108,
        elevation: 766.7595684954222,
      },
      {
        latitude: 47.650227,
        longitude: 11.381106,
        elevation: 768.9035604706273,
      },
      {
        latitude: 47.650217,
        longitude: 11.381084,
        elevation: 769.1788545087204,
      },
      {
        latitude: 47.650227,
        longitude: 11.381045,
        elevation: 769.5105308751054,
      },
      {
        latitude: 47.650223,
        longitude: 11.380996,
        elevation: 769.9671622744786,
      },
      {
        latitude: 47.650188,
        longitude: 11.380954,
        elevation: 770.531729795653,
      },
      {
        latitude: 47.650133,
        longitude: 11.380961,
        elevation: 771.5182439719695,
      },
      {
        latitude: 47.650042,
        longitude: 11.38108,
        elevation: 772.4933624380224,
      },
      {
        latitude: 47.650039,
        longitude: 11.381171,
        elevation: 774.3187746152903,
      },
      {
        latitude: 47.650155,
        longitude: 11.381338,
        elevation: 776.5410330951167,
      },
      {
        latitude: 47.650161,
        longitude: 11.38158,
        elevation: 778.6976611009618,
      },
      {
        latitude: 47.65012,
        longitude: 11.381642,
        elevation: 780.5372205917781,
      },
      {
        latitude: 47.650101,
        longitude: 11.381702,
        elevation: 781.6537364143294,
      },
      {
        latitude: 47.650109,
        longitude: 11.381824,
        elevation: 782.408892427107,
      },
      { latitude: 47.650127, longitude: 11.3819, elevation: 783.3305004256583 },
      {
        latitude: 47.650198,
        longitude: 11.381895,
        elevation: 784.3157798363309,
      },
      {
        latitude: 47.650298,
        longitude: 11.381746,
        elevation: 785.1847916735791,
      },
      {
        latitude: 47.650349,
        longitude: 11.381693,
        elevation: 785.9076494781215,
      },
      {
        latitude: 47.650355,
        longitude: 11.381734,
        elevation: 785.8774852766032,
      },
      { latitude: 47.650347, longitude: 11.3819, elevation: 785.6192469874954 },
      {
        latitude: 47.650351,
        longitude: 11.381958,
        elevation: 785.2410630749382,
      },
      {
        latitude: 47.650366,
        longitude: 11.381956,
        elevation: 784.4409015489616,
      },
      {
        latitude: 47.650483,
        longitude: 11.381605,
        elevation: 784.1591538024461,
      },
      {
        latitude: 47.650499,
        longitude: 11.381604,
        elevation: 783.9192263630974,
      },
      {
        latitude: 47.65056,
        longitude: 11.381636,
        elevation: 785.4512261642916,
      },
      {
        latitude: 47.650598,
        longitude: 11.381935,
        elevation: 786.5728368241503,
      },
      {
        latitude: 47.650718,
        longitude: 11.381911,
        elevation: 788.0255041809112,
      },
      {
        latitude: 47.650832,
        longitude: 11.381724,
        elevation: 788.3296609302453,
      },
      {
        latitude: 47.650953,
        longitude: 11.381688,
        elevation: 788.6860498959647,
      },
      {
        latitude: 47.651034,
        longitude: 11.381879,
        elevation: 788.6884162476421,
      },
      {
        latitude: 47.651104,
        longitude: 11.381796,
        elevation: 788.2796572444722,
      },
      {
        latitude: 47.651227,
        longitude: 11.381517,
        elevation: 788.1825804310304,
      },
      {
        latitude: 47.651315,
        longitude: 11.381547,
        elevation: 788.2084604661277,
      },
      {
        latitude: 47.651374,
        longitude: 11.381655,
        elevation: 789.1352304600364,
      },
      {
        latitude: 47.651428,
        longitude: 11.381828,
        elevation: 790.8209501383465,
      },
      {
        latitude: 47.651469,
        longitude: 11.382144,
        elevation: 791.6808523559077,
      },
      {
        latitude: 47.651506,
        longitude: 11.382151,
        elevation: 791.4682493020089,
      },
      {
        latitude: 47.651593,
        longitude: 11.381889,
        elevation: 790.1381115695767,
      },
      {
        latitude: 47.651663,
        longitude: 11.381821,
        elevation: 788.1577750027311,
      },
      {
        latitude: 47.651786,
        longitude: 11.381784,
        elevation: 786.7822868099374,
      },
      {
        latitude: 47.651891,
        longitude: 11.381576,
        elevation: 784.9153443746264,
      },
      { latitude: 47.65179, longitude: 11.381128, elevation: 783.256464601531 },
      {
        latitude: 47.651804,
        longitude: 11.381099,
        elevation: 781.1535076663242,
      },
      {
        latitude: 47.651785,
        longitude: 11.380881,
        elevation: 779.7978666992746,
      },
      {
        latitude: 47.651787,
        longitude: 11.380733,
        elevation: 778.2030987506075,
      },
      {
        latitude: 47.651828,
        longitude: 11.380585,
        elevation: 776.2068426039101,
      },
      {
        latitude: 47.651923,
        longitude: 11.38034,
        elevation: 773.1425097952178,
      },
      {
        latitude: 47.652039,
        longitude: 11.379934,
        elevation: 769.838458246941,
      },
      {
        latitude: 47.652092,
        longitude: 11.379714,
        elevation: 766.3383098531542,
      },
      {
        latitude: 47.65217,
        longitude: 11.379516,
        elevation: 762.6620940434447,
      },
      {
        latitude: 47.652289,
        longitude: 11.379121,
        elevation: 760.2855023935997,
      },
      { latitude: 47.652381, longitude: 11.379, elevation: 758.0640184615838 },
      {
        latitude: 47.652456,
        longitude: 11.378968,
        elevation: 757.5779852202138,
      },
      {
        latitude: 47.652567,
        longitude: 11.378952,
        elevation: 757.3561263893257,
      },
      {
        latitude: 47.652664,
        longitude: 11.378954,
        elevation: 757.0377274674292,
      },
      {
        latitude: 47.652828,
        longitude: 11.379027,
        elevation: 755.3183458790689,
      },
      {
        latitude: 47.653069,
        longitude: 11.379172,
        elevation: 752.6959647241749,
      },
      {
        latitude: 47.653462,
        longitude: 11.379346,
        elevation: 749.5424651807581,
      },
      {
        latitude: 47.653761,
        longitude: 11.379602,
        elevation: 747.4670905715179,
      },
      {
        latitude: 47.653797,
        longitude: 11.379666,
        elevation: 746.6836838665715,
      },
      {
        latitude: 47.653892,
        longitude: 11.379786,
        elevation: 746.6111218590602,
      },
      {
        latitude: 47.653945,
        longitude: 11.379755,
        elevation: 746.3673939206611,
      },
      {
        latitude: 47.654131,
        longitude: 11.379688,
        elevation: 745.3589704685544,
      },
      {
        latitude: 47.654212,
        longitude: 11.37957,
        elevation: 742.8961756003343,
      },
      {
        latitude: 47.654447,
        longitude: 11.379463,
        elevation: 739.6718653693763,
      },
      {
        latitude: 47.654601,
        longitude: 11.379457,
        elevation: 736.4774937616716,
      },
      {
        latitude: 47.654657,
        longitude: 11.379404,
        elevation: 733.4816106423773,
      },
      {
        latitude: 47.65476,
        longitude: 11.379409,
        elevation: 731.5139614310613,
      },
      {
        latitude: 47.654856,
        longitude: 11.379471,
        elevation: 729.5086841017178,
      },
      {
        latitude: 47.654857,
        longitude: 11.379382,
        elevation: 728.1088837545449,
      },
      {
        latitude: 47.654888,
        longitude: 11.379294,
        elevation: 727.0697913929002,
      },
      {
        latitude: 47.654868,
        longitude: 11.379216,
        elevation: 725.0012089694906,
      },
      {
        latitude: 47.654982,
        longitude: 11.379262,
        elevation: 723.2213672091942,
      },
      {
        latitude: 47.655027,
        longitude: 11.379315,
        elevation: 721.2459734505189,
      },
      {
        latitude: 47.655045,
        longitude: 11.379307,
        elevation: 720.1747415454197,
      },
      {
        latitude: 47.655053,
        longitude: 11.379275,
        elevation: 719.2132129792707,
      },
      {
        latitude: 47.655027,
        longitude: 11.379211,
        elevation: 717.8655072777203,
      },
      {
        latitude: 47.655022,
        longitude: 11.379103,
        elevation: 715.2654474056048,
      },
      {
        latitude: 47.655174,
        longitude: 11.379095,
        elevation: 713.1652908426074,
      },
      {
        latitude: 47.655215,
        longitude: 11.379055,
        elevation: 709.9496275582607,
      },
      {
        latitude: 47.655266,
        longitude: 11.378883,
        elevation: 707.9847302137107,
      },
      {
        latitude: 47.655186,
        longitude: 11.378768,
        elevation: 705.8424528102375,
      },
      {
        latitude: 47.655181,
        longitude: 11.37868,
        elevation: 704.3288763956449,
      },
      {
        latitude: 47.655246,
        longitude: 11.378669,
        elevation: 702.4603784536289,
      },
      {
        latitude: 47.655262,
        longitude: 11.37857,
        elevation: 700.7068256849543,
      },
      {
        latitude: 47.655296,
        longitude: 11.378588,
        elevation: 697.8977629836947,
      },
      {
        latitude: 47.65534,
        longitude: 11.378497,
        elevation: 696.0964073467387,
      },
      { latitude: 47.655316, longitude: 11.37847, elevation: 693.27849445629 },
      {
        latitude: 47.655315,
        longitude: 11.378363,
        elevation: 691.0824357804311,
      },
      {
        latitude: 47.655351,
        longitude: 11.37828,
        elevation: 688.3473689540041,
      },
      {
        latitude: 47.655454,
        longitude: 11.378253,
        elevation: 685.5625046637767,
      },
      {
        latitude: 47.655371,
        longitude: 11.378092,
        elevation: 682.3890503246544,
      },
      {
        latitude: 47.655457,
        longitude: 11.37787,
        elevation: 679.7216987936567,
      },
      {
        latitude: 47.655434,
        longitude: 11.377794,
        elevation: 677.1201665489564,
      },
      {
        latitude: 47.655483,
        longitude: 11.377733,
        elevation: 675.6961836849439,
      },
      {
        latitude: 47.655461,
        longitude: 11.377682,
        elevation: 673.8863866235072,
      },
      {
        latitude: 47.655535,
        longitude: 11.377725,
        elevation: 672.5879922483753,
      },
      {
        latitude: 47.655575,
        longitude: 11.37773,
        elevation: 671.0526707394156,
      },
      {
        latitude: 47.655595,
        longitude: 11.377671,
        elevation: 669.3263554491414,
      },
      {
        latitude: 47.655616,
        longitude: 11.377515,
        elevation: 665.7202440682647,
      },
      {
        latitude: 47.655843,
        longitude: 11.377339,
        elevation: 662.8113889246755,
      },
      {
        latitude: 47.655887,
        longitude: 11.377223,
        elevation: 659.4608341811004,
      },
      {
        latitude: 47.655897,
        longitude: 11.377098,
        elevation: 658.5674209538499,
      },
      {
        latitude: 47.655898,
        longitude: 11.376992,
        elevation: 657.9787227121254,
      },
      {
        latitude: 47.655916,
        longitude: 11.376994,
        elevation: 657.6499849270248,
      },
      {
        latitude: 47.655966,
        longitude: 11.377108,
        elevation: 657.5019548172049,
      },
      {
        latitude: 47.655979,
        longitude: 11.377114,
        elevation: 657.245285369607,
      },
      {
        latitude: 47.656012,
        longitude: 11.377135,
        elevation: 657.0932706643939,
      },
      {
        latitude: 47.65606,
        longitude: 11.377135,
        elevation: 657.0529375771704,
      },
      {
        latitude: 47.656112,
        longitude: 11.377154,
        elevation: 657.0499119805439,
      },
      {
        latitude: 47.656149,
        longitude: 11.377161,
        elevation: 657.3294493430795,
      },
      {
        latitude: 47.656197,
        longitude: 11.376982,
        elevation: 657.5632105307357,
      },
      {
        latitude: 47.656195,
        longitude: 11.376883,
        elevation: 657.839400432498,
      },
      {
        latitude: 47.656205,
        longitude: 11.376831,
        elevation: 657.6501865531039,
      },
      {
        latitude: 47.656284,
        longitude: 11.376715,
        elevation: 657.0790619676659,
      },
      {
        latitude: 47.656304,
        longitude: 11.376465,
        elevation: 656.3865232110677,
      },
      {
        latitude: 47.656286,
        longitude: 11.376424,
        elevation: 655.6215790684118,
      },
      {
        latitude: 47.656296,
        longitude: 11.376361,
        elevation: 654.8374487066981,
      },
      {
        latitude: 47.656348,
        longitude: 11.376229,
        elevation: 653.719356766198,
      },
      {
        latitude: 47.656368,
        longitude: 11.376045,
        elevation: 652.2042107814325,
      },
      {
        latitude: 47.656405,
        longitude: 11.375855,
        elevation: 650.048212494409,
      },
      {
        latitude: 47.656442,
        longitude: 11.375627,
        elevation: 647.5580099106303,
      },
      {
        latitude: 47.656514,
        longitude: 11.375409,
        elevation: 644.7150837810094,
      },
      {
        latitude: 47.656611,
        longitude: 11.375221,
        elevation: 642.8930769496362,
      },
      {
        latitude: 47.656618,
        longitude: 11.375208,
        elevation: 641.687629033245,
      },
      {
        latitude: 47.656631,
        longitude: 11.375189,
        elevation: 640.3597359586396,
      },
      { latitude: 47.65682, longitude: 11.37497, elevation: 638.1356234197231 },
      {
        latitude: 47.65707,
        longitude: 11.374717,
        elevation: 635.4942672378841,
      },
      {
        latitude: 47.657234,
        longitude: 11.374565,
        elevation: 633.3153222687033,
      },
      {
        latitude: 47.657233,
        longitude: 11.374475,
        elevation: 632.1341106563629,
      },
      {
        latitude: 47.657234,
        longitude: 11.374385,
        elevation: 631.447786641283,
      },
      {
        latitude: 47.657233,
        longitude: 11.37433,
        elevation: 630.7116107850567,
      },
      {
        latitude: 47.657238,
        longitude: 11.374244,
        elevation: 630.0352519892285,
      },
      {
        latitude: 47.657257,
        longitude: 11.37412,
        elevation: 629.1665616441223,
      },
      {
        latitude: 47.657295,
        longitude: 11.373974,
        elevation: 628.3373307612774,
      },
      {
        latitude: 47.657324,
        longitude: 11.373802,
        elevation: 627.458311911821,
      },
      {
        latitude: 47.657335,
        longitude: 11.373606,
        elevation: 626.4269997367777,
      },
      {
        latitude: 47.657528,
        longitude: 11.373434,
        elevation: 625.6466410473267,
      },
      {
        latitude: 47.657559,
        longitude: 11.373302,
        elevation: 624.0710314968255,
      },
      {
        latitude: 47.657651,
        longitude: 11.372563,
        elevation: 622.5514146016083,
      },
      {
        latitude: 47.657763,
        longitude: 11.371804,
        elevation: 620.6725044942167,
      },
      {
        latitude: 47.658067,
        longitude: 11.371946,
        elevation: 619.4576686295759,
      },
      {
        latitude: 47.658143,
        longitude: 11.371945,
        elevation: 618.2468837095731,
      },
      {
        latitude: 47.658507,
        longitude: 11.371812,
        elevation: 617.5550028425682,
      },
      { latitude: 47.65883, longitude: 11.37171, elevation: 616.4980018640075 },
      {
        latitude: 47.658971,
        longitude: 11.371683,
        elevation: 614.9304030650948,
      },
      {
        latitude: 47.659863,
        longitude: 11.371836,
        elevation: 613.7181880825691,
      },
      {
        latitude: 47.660134,
        longitude: 11.371878,
        elevation: 611.9907697288727,
      },
      {
        latitude: 47.660406,
        longitude: 11.37188,
        elevation: 611.4054320961757,
      },
      {
        latitude: 47.660427,
        longitude: 11.37194,
        elevation: 611.0185853451959,
      },
      { latitude: 47.660533, longitude: 11.371792, elevation: 611.0 },
      { latitude: 47.66046, longitude: 11.371488, elevation: 611.0 },
      { latitude: 47.660457, longitude: 11.371479, elevation: 611.0 },
    ],
    terrainSegments: [
      { type: Terrain.Dirt, start: 0, end: 50 },
      { type: Terrain.Grass, start: 50, end: 100 },
      { type: Terrain.Dirt, start: 100, end: 150 },
      { type: Terrain.Snow, start: 150, end: 200 },
    ],
    sacScaleSegments: [
      { sacScale: 2, start: 0, end: 50 },
      { sacScale: 3, start: 50, end: 100 },
      { sacScale: 4, start: 100, end: 150 },
      { sacScale: 3, start: 150, end: 200 },
    ],
  },
  {
    id: 2,
    name: "Alpine Ridge Trail",
    distance: 12.0,
    duration: 360, // 6 hours in minutes
    rating: 2100, // ELO-style rating
    boundingBox: {
      minLatitude: 46.5,
      maxLatitude: 46.8,
      minLongitude: 10.5,
      maxLongitude: 10.9,
    },
    elevation_gain: 800,
    sac_scale: 3,
    peaks: [],
    huts: [],
    waypoints: [
      { latitude: 47.55, longitude: 11.4, elevation: 1000 },
      { latitude: 47.552, longitude: 11.402, elevation: 1020 },
      { latitude: 47.555, longitude: 11.405, elevation: 1040 },
      { latitude: 47.558, longitude: 11.408, elevation: 1060 },
      { latitude: 47.561, longitude: 11.411, elevation: 1080 },
      { latitude: 47.565, longitude: 11.414, elevation: 1100 },
      { latitude: 47.569, longitude: 11.417, elevation: 1120 },
      { latitude: 47.573, longitude: 11.42, elevation: 1140 },
      { latitude: 47.577, longitude: 11.422, elevation: 1160 },
      { latitude: 47.581, longitude: 11.424, elevation: 1180 },
      { latitude: 47.585, longitude: 11.426, elevation: 1200 },
      { latitude: 47.589, longitude: 11.428, elevation: 1220 },
      { latitude: 47.593, longitude: 11.429, elevation: 1240 },
      { latitude: 47.597, longitude: 11.43, elevation: 1260 },
      { latitude: 47.601, longitude: 11.431, elevation: 1280 },
      { latitude: 47.605, longitude: 11.432, elevation: 1300 },
    ],
    terrainSegments: [
      { type: Terrain.Dirt, start: 0, end: 4 },
      { type: Terrain.Gravel, start: 4, end: 8 },
      { type: Terrain.Dirt, start: 8, end: 12 },
      { type: Terrain.Snow, start: 12, end: 15 },
    ],
    sacScaleSegments: [
      { sacScale: 2, start: 0, end: 5 },
      { sacScale: 3, start: 5, end: 10 },
      { sacScale: 4, start: 10, end: 15 },
    ],
  },
  {
    id: 3,
    name: "Forest Valley Loop",
    distance: 6.5,
    elevation_gain: 400,
    duration: 180, // 3 hours in minutes
    rating: 1650, // ELO-style rating
    sac_scale: 1,
    peaks: [],
    huts: [],
    waypoints: [
      { latitude: 47.6, longitude: 11.3, elevation: 800 },
      { latitude: 47.601, longitude: 11.302, elevation: 805 },
      { latitude: 47.603, longitude: 11.305, elevation: 810 },
      { latitude: 47.605, longitude: 11.308, elevation: 815 },
      { latitude: 47.607, longitude: 11.31, elevation: 820 },
      { latitude: 47.609, longitude: 11.312, elevation: 825 },
      { latitude: 47.611, longitude: 11.313, elevation: 830 },
      { latitude: 47.613, longitude: 11.314, elevation: 835 },
      { latitude: 47.615, longitude: 11.315, elevation: 840 },
      { latitude: 47.617, longitude: 11.316, elevation: 845 },
      { latitude: 47.619, longitude: 11.317, elevation: 850 },
      { latitude: 47.621, longitude: 11.318, elevation: 855 },
    ],
    terrainSegments: [
      { type: Terrain.Dirt, start: 0, end: 3 },
      { type: Terrain.Grass, start: 3, end: 6 },
      { type: Terrain.Grass, start: 6, end: 9 },
      { type: Terrain.Dirt, start: 9, end: 11 },
    ],
    sacScaleSegments: [{ sacScale: 1, start: 0, end: 11 }],
  },
];

// Add elevation stats for each route and export the final RouteDetails array
export const mockRouteDetails: RouteDetails[] = baseMockRouteDetails.map(
  (route) =>
    ({
      ...route,
      ...getElevationStats(route.id),
    } as RouteDetails)
);
