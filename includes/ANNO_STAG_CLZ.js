// A

// A1
function get_anno_stag_clz(inputTable, articoliColoreAngTable, tabstaclzAngTable, tabstaAngTable, articoloColumn, coloreColumn, emissioneDtaColumn, primaryKeys){
  return `
  WITH TABELLA AS(

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
1 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
WHERE
  A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
  AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
  AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
  AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
  AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
  AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
  AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
  AND DWDC_PROD_FLG = 'S'
  AND C.DWDD_STAG_DA_DTA <= INPUT.${emissioneDtaColumn}
  AND C.DWDD_STAG_A_DTA >= INPUT.${emissioneDtaColumn}
  AND B.DWDE_CLZ_DA_DTA <= INPUT.${emissioneDtaColumn}
  AND B.DWDE_CLZ_A_DTA >= INPUT.${emissioneDtaColumn}
      ORDER BY
      B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
2 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'S'
      AND B.DWDE_CLZ_DA_DTA <= INPUT.${emissioneDtaColumn}
      AND B.DWDE_CLZ_A_DTA >= INPUT.${emissioneDtaColumn}
    ORDER BY
      C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
3 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'S'
      AND B.DWDE_CLZ_A_DTA < INPUT.${emissioneDtaColumn}
    ORDER BY
      C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
4 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY C.DWDD_STAG_ID_COD , B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
    WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'S'
      AND B.DWDE_CLZ_DA_DTA > INPUT.${emissioneDtaColumn}
    ORDER BY
      C.DWDD_STAG_ID_COD , B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
5 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
    WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'N'
      AND C.DWDD_STAG_DA_DTA <= INPUT.${emissioneDtaColumn}
      AND C.DWDD_STAG_A_DTA >= INPUT.${emissioneDtaColumn}
      AND B.DWDE_CLZ_DA_DTA <= INPUT.${emissioneDtaColumn}
      AND B.DWDE_CLZ_A_DTA >= INPUT.${emissioneDtaColumn}
    ORDER BY
      B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
6 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
    WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'N'
      AND B.DWDE_CLZ_DA_DTA <= INPUT.${emissioneDtaColumn}
      AND B.DWDE_CLZ_A_DTA >= INPUT.${emissioneDtaColumn}
    ORDER BY
      C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
7 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
    WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'N'
      AND B.DWDE_CLZ_A_DTA < INPUT.${emissioneDtaColumn}
    ORDER BY
      C.DWDD_STAG_ID_COD  DESC , B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

UNION ALL

(SELECT ${primaryKeys.join(",")}, PRIORITY, DWDE_VND_ANNO_COD, DWDE_VND_STAG_COD, DWDE_VND_CLZ_COD FROM(
SELECT ${primaryKeys.map(p => "INPUT." + p).join(",\n")},
8 AS PRIORITY,
A.DWDE_VND_ANNO_COD,
A.DWDE_VND_STAG_COD,
A.DWDE_VND_CLZ_COD,
  ROW_NUMBER() OVER(PARTITION BY ${primaryKeys.join(",")} ORDER BY C.DWDD_STAG_ID_COD , B.DWDE_PRIORITA_COD) ROW_NUMBER
FROM ${inputTable} INPUT,
      ${articoliColoreAngTable} A,
      ${tabstaclzAngTable} B,
      ${tabstaAngTable} C
    WHERE
      A.DWDE_VND_ANNO_COD = B.DWDE_VND_ANNO_COD
      AND A.DWDE_VND_STAG_COD = B.DWDE_VND_STAG_COD
      AND A.DWDE_VND_CLZ_COD = B.DWDE_VND_CLZ_COD
      AND B.DWDE_VND_ANNO_COD = C.DWDE_VND_ANNO_COD
      AND B.DWDE_VND_STAG_COD = C.DWDE_VND_STAG_COD
      AND A.DWD4_ARTICOLO_COD = INPUT.${articoloColumn}
      AND A.DWM9_COLORE_COD = INPUT.${coloreColumn}
      AND DWDC_PROD_FLG = 'N'
      AND B.DWDE_CLZ_DA_DTA > INPUT.${emissioneDtaColumn}
    ORDER BY
      C.DWDD_STAG_ID_COD , B.DWDE_PRIORITA_COD
)
WHERE ROW_NUMBER = 1)

)

SELECT ${primaryKeys.map(p => "TABELLA." + p).join(",")}, TABELLA.DWDE_VND_ANNO_COD, TABELLA.DWDE_VND_STAG_COD, TABELLA.DWDE_VND_CLZ_COD   
FROM TABELLA INNER JOIN
    (
        SELECT ${primaryKeys.join(",")}, MIN(PRIORITY) AS MIN_PRIORITY
        FROM TABELLA
        GROUP BY ${primaryKeys.join(",")}
    ) t ON ${primaryKeys.map(p => "TABELLA." + p + " = t." + p).join(" AND ")} AND TABELLA.PRIORITY = t.MIN_PRIORITY
  `;
}

module.exports = {
get_anno_stag_clz
}