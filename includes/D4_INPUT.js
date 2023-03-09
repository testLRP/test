function get_udm() {
  return `
 CASE WHEN EDDA_MARA_MTART IN('ZINT','ZTEX') THEN LOWER(EDDA_UDM_COD)
                     ELSE EDDA_UDM_COD
                END`;
}




function get_tipoArticolo() {
  return `CASE WHEN EDDA_MARA_MTART='ZINT' THEN 'INT'
                     WHEN EDDA_MARA_MTART='ZTEX' THEN 'TES'
                     WHEN EDDA_MARA_MTART='ZREM' THEN 'SCAM'
                     WHEN EDDA_MARA_MTART='ZCUS' THEN EDDA_MARA_ZZCATEGORY   
                     ELSE NULL
                END`;
}


function get_famiglia(fixed_value) {
  return `CASE WHEN SUBSTR(EDDA_ARTICOLO_COD,1,12) = 'ALTERATIONPK' THEN 'ALTRO' 
        WHEN  ${fixed_value ? "'" + fixed_value + "'" : get_tipoArticolo()} = 'U1' or  ${fixed_value ? "'" + fixed_value + "'" : get_tipoArticolo()} = 'U2' or  ${fixed_value ? "'" + fixed_value + "'" : get_tipoArticolo()} = 'U3' or  ${fixed_value ? "'" + fixed_value + "'" : get_tipoArticolo()} = 'U4' THEN 'SUM' ELSE  ${fixed_value ? "'" + fixed_value + "'" : get_tipoArticolo()} END`;
}

function get_famiglia_sap() {
  return `CASE WHEN SUBSTR(ARTICOLO_COD,1,12) = 'ALTERATIONPK' THEN 'ALTRO' 
        WHEN TIPO_ARTICOLO = 'U1' or  TIPO_ARTICOLO = 'U2' or  TIPO_ARTICOLO = 'U3' or  TIPO_ARTICOLO = 'U4' THEN 'SUM' ELSE  TIPO_ARTICOLO END`;
}


module.exports = {
  get_udm, get_famiglia, get_tipoArticolo, get_famiglia_sap
}