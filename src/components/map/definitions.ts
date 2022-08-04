import { ReactNode } from 'react';

import { Map as _Map } from 'ol';
import BaseLayer from 'ol/layer/Base';

export const EPSG_WEB_MERCATOR = 'EPSG:3857';

export const SWITCH_CITIES_TO_POST_OFFICES_RESOLUTION = 30;

export type MapProps = {
  style?: React.CSSProperties;
  children?: ReactNode;
  center?: number[];
  zoom?: number;
};

// レイヤに属性として識別子を追加するキー
export const LAYER_IDENTIFY_KEY = 'layerIdentify';
// 郵便局レイヤの識別子
export const POST_OFFICE_LAYER_IDENTIFY = 'postOffice';

/**
 * マップに追加されているレイヤのうち、属性として追加した識別子が一致するレイヤを検索する。
 * @param map マップ。
 * @param identify 検索するレイヤの識別子。
 * @returns レイヤ。レイヤが見つからなかった場合はundefined。
 */
export const findLayerByIdentify = (
  map: _Map,
  identify: string,
): BaseLayer | undefined => {
  const layers = map.getLayers().getArray();

  return layers.find((layer) => {
    const keys = layer.getKeys();
    if (!keys.includes(LAYER_IDENTIFY_KEY)) return false;

    return identify === (layer.get(LAYER_IDENTIFY_KEY) as string);
  });
};

export const cityDictionary = (): Map<string, string> => {
  const dictionary = new Map<string, string>();
  dictionary.set('21201', '岐阜市');
  dictionary.set('21202', '大垣市');
  dictionary.set('21203', '高山市');
  dictionary.set('21204', '多治見市');
  dictionary.set('21205', '関市');
  dictionary.set('21206', '中津川市');
  dictionary.set('21207', '美濃市');
  dictionary.set('21208', '瑞浪市');
  dictionary.set('21209', '羽島市');
  dictionary.set('21210', '恵那市');
  dictionary.set('21211', '美濃加茂市');
  dictionary.set('21212', '土岐市');
  dictionary.set('21213', '各務原市');
  dictionary.set('21214', '可児市');
  dictionary.set('21215', '山県市');
  dictionary.set('21216', '瑞穂市');
  dictionary.set('21217', '飛騨市');
  dictionary.set('21218', '本巣市');
  dictionary.set('21219', '郡上市');
  dictionary.set('21220', '下呂市');
  dictionary.set('21221', '海津市');
  dictionary.set('21302', '岐南町');
  dictionary.set('21303', '笠松町');
  dictionary.set('21341', '養老町');
  dictionary.set('21361', '垂井町');
  dictionary.set('21362', '関ケ原町');
  dictionary.set('21381', '神戸町');
  dictionary.set('21382', '輪之内町');
  dictionary.set('21383', '安八町');
  dictionary.set('21401', '揖斐川町');
  dictionary.set('21403', '大野町');
  dictionary.set('21404', '池田町');
  dictionary.set('21421', '北方町');
  dictionary.set('21501', '坂祝町');
  dictionary.set('21502', '富加町');
  dictionary.set('21503', '川辺町');
  dictionary.set('21504', '七宗町');
  dictionary.set('21505', '八百津町');
  dictionary.set('21506', '白川町');
  dictionary.set('21507', '東白川村');
  dictionary.set('21521', '御嵩町');
  dictionary.set('21604', '白川村');

  return dictionary;
};

export const facilityCategoryDictionary = (): Map<string, string> => {
  const dictionary = new Map<string, string>();
  dictionary.set('3', '建物');
  dictionary.set('9', 'その他');
  dictionary.set('11', '国の機関');
  dictionary.set('12', '地方公共団体');
  dictionary.set('13', '厚生機関');
  dictionary.set('14', '警察機関');
  dictionary.set('15', '消防署');
  dictionary.set('16', '学校');
  dictionary.set('17', '病院');
  dictionary.set('18', '郵便局');
  dictionary.set('19', '福祉施設');

  return dictionary;
};

export const facilitySubcategoryDictionary = (): Map<string, string> => {
  const dictionary = new Map<string, string>();
  dictionary.set('3001', '美術館');
  dictionary.set('3002', '資料館，記念館，博物館，科学館');
  dictionary.set('3003', '図書館');
  dictionary.set('3004', '水族館');
  dictionary.set('3005', '動植物園');
  dictionary.set('9001', '公共企業体・政府関係機関');
  dictionary.set('9002', '独立行政法人・大学共同利用機関法人');
  dictionary.set('11100', '国会');
  dictionary.set('11101', '会計検査院');
  dictionary.set('11102', '人事院');
  dictionary.set('11103', '内閣法制局');
  dictionary.set('11110', '内閣府');
  dictionary.set('11111', '内閣官房');
  dictionary.set('11112', '宮内庁');
  dictionary.set('11113', '金融庁');
  dictionary.set('11114', '公正取引委員会');
  dictionary.set('11120', '国家公安委員会');
  dictionary.set('11121', '警察庁');
  dictionary.set('11130', '防衛庁');
  dictionary.set('11131', '防衛施設庁');
  dictionary.set('11140', '総務省');
  dictionary.set('11142', '消防庁');
  dictionary.set('11144', '公害等調整委員会');
  dictionary.set('11150', '法務省');
  dictionary.set('11151', '検察庁');
  dictionary.set('11152', '公安調査庁');
  dictionary.set('11153', '公安審査委員会');
  dictionary.set('11160', '外務省');
  dictionary.set('11161', '外国公館');
  dictionary.set('11170', '財務省');
  dictionary.set('11171', '国税庁');
  dictionary.set('11180', '文部科学省');
  dictionary.set('11181', '文化庁');
  dictionary.set('11190', '厚生労働省');
  dictionary.set('11191', '社会保険庁');
  dictionary.set('11192', '中央労働委員会');
  dictionary.set('11200', '農林水産省');
  dictionary.set('11202', '林野庁');
  dictionary.set('11203', '水産庁');
  dictionary.set('11210', '経済産業省');
  dictionary.set('11211', '資源エネルギー庁');
  dictionary.set('11212', '特許庁');
  dictionary.set('11213', '中小企業庁');
  dictionary.set('11220', '国土交通省');
  dictionary.set('11221', '海上保安庁');
  dictionary.set('11222', '海難審判庁');
  dictionary.set('11223', '気象庁');
  dictionary.set('11224', '船員労働委員会');
  dictionary.set('11230', '環境省');
  dictionary.set('11240', '裁判所');
  dictionary.set('12001', '都道府県庁');
  dictionary.set('12002', '区役所（東京都），市役所');
  dictionary.set('12003', '区役所（政令指定都市）');
  dictionary.set('12004', '町村役場');
  dictionary.set('12005', '都道府県の出先機関');
  dictionary.set('13001', '保健所');
  dictionary.set('16001', '小学校');
  dictionary.set('16002', '中学校');
  dictionary.set('16003', '中等教育学校');
  dictionary.set('16004', '高等学校');
  dictionary.set('16005', '高等専門学校');
  dictionary.set('16006', '短期大学');
  dictionary.set('16007', '大学');
  dictionary.set('16008', '盲学校');
  dictionary.set('16009', 'ろう学校');
  dictionary.set('16010', '養護学校');
  dictionary.set('18001', '普通郵便局');
  dictionary.set('18002', '特定郵便局（集配局）');
  dictionary.set('18003', '特定郵便局（無集配局）');
  dictionary.set('18004', '簡易郵便局');
  dictionary.set('18005', '地域区分局');

  return dictionary;
};

export const postOfficeClassDictionary = (): Map<string, string> => {
  const dictionary = new Map<string, string>();
  dictionary.set('18004', '簡易郵便局');
  dictionary.set('18006', '直営郵便局');

  return dictionary;
};
