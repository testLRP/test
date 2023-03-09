function tess_intr_flg() {
  return `
    CASE
        WHEN EDDA_MARA_MTART = 'ZTEX' THEN '1'
        WHEN EDDA_MARA_MTART = 'ZINT' THEN '2'
        WHEN EDDA_MARA_MTART = 'ZREM' THEN '3'
        ELSE '0'
      END 
  `;
}



function motivoAcqs() {
  return `
    CASE
    WHEN CAU_RSO_RGH_COD='RES' THEN MOTIVO_ACQS
    WHEN temp_MOTIVO_ACQS='1001' THEN 'REG'
    ELSE 'NOR'
    END
    `;
}

function scontoManualeVal() {
  return `(CASE WHEN VBRP_ZZWI17 <> 0 AND VBRP_ZZWI09 <> 0 AND VBRP_ZZWI17 <> VBRP_ZZWI09 THEN VBRP_ZZWI17 / abs(QTA) ELSE 0 END)`;
}

function scontoManualeCausale() {
  return `(CASE WHEN ${TLDB1_TRANS_SAPBS_SAL_utils.scontoManualeVal()} <> 0 THEN 'MCHP' ELSE 'nd' END)`;
}

function chkBatch() {
  return `
        CASE
        WHEN BATCH_ANN_COD='-' OR BATCH_SOTTO_STAG_COD='-' OR BATCH_STAG_COD='-' THEN 'errato'
        ELSE 'ok'
        END
    `;
}


function lisVnd() {
  return `
        CASE
        WHEN CAU_RSO_RGH_COD = 'SPE'
        OR CAU_RSO_RGH_COD = 'ACR'
        or CAU_RSO_RGH_COD = 'ACU'
        or CAU_RSO_RGH_COD = 'BUR'
        or CAU_RSO_RGH_COD = 'BUU' THEN null
        ELSE (
        CASE
            WHEN ${TLDB1_TRANS_SAPBS_SAL_utils.scontoManualeCausale()} = 'MCHP'
            AND VBRP_ZZPOSOV = 'X' THEN ${TLDB1_TRANS_SAPBS_SAL_utils.scontoManualeVal()}
            ELSE PRIX_VND_LOC
        END
        )
        END
    `;
}

function lisOrig() {
  return `
        CASE
        WHEN CAU_RSO_RGH_COD = 'SPE'
        OR CAU_RSO_RGH_COD = 'ACR'
        OR CAU_RSO_RGH_COD = 'ACU'
        OR CAU_RSO_RGH_COD = 'BUR'
        OR CAU_RSO_RGH_COD = 'BUU' THEN null
        ELSE PRIX_ORIG_LOC
        END
    `;
}

function lisVndSzIva() {
  return `
        CASE
        WHEN TLDB1_INPUT.ARTICOLO_COD = 'SPESE' THEN 0
        WHEN CAU_RSO_RGH_COD='VEN' OR  CAU_RSO_RGH_COD='RES' THEN PRIX_VND_SZ_IVA_LOC_VAL
        ELSE 0
        END
    `;
}

function tassaPrc() {
  return `
        CASE
        WHEN DWD1_SORGENTE_DATI_COD IN ('JAPAN', 'CINA') AND TLDB1_VAT.ZINT_VAT_FL_SCO="0" THEN TLDB1_VAT.ZINT_VAT_PERC
        ELSE VBRP_ZZSTATE
        END
    `;
}

module.exports = {
  motivoAcqs,
  scontoManualeVal,
  scontoManualeCausale,
  chkBatch,
  lisVnd,
  lisOrig,
  lisVndSzIva,
  tassaPrc,
  tess_intr_flg
}
