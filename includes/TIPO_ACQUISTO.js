// YYY

function cauSconto1() {
   return `
   COALESCE(KONV_TDWN4_causale_sconto_riga_1.KONV_KSCHL,"nd") 
   `;
}

function cauSconto2() {
   return `
    COALESCE(KONV_TDWN4_causale_sconto_riga_2.KONV_KSCHL,"nd") 
   `;
}
function cauSconto3() {
   return `
   COALESCE(KONV_TDWN4_causale_sconto_riga_3.KONV_KSCHL,"nd") 
   `;
}

function tipoAcqs1(ctx) {
  return `
  CASE WHEN (${TIPO_ACQUISTO.cauSconto1()} in ('ZDI1','ZDI4','ZDI5','ZDI7','ZDSP')
   and NOT (TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL))
THEN 1
  WHEN 
    (${TIPO_ACQUISTO.cauSconto1()} in ('ZDI1','ZDI4','ZDI5','ZDI7','ZDSP' )
    and UDM_COD='cm'
   )
   or
   (
   (${TIPO_ACQUISTO.cauSconto1()}='ZDI1' 
   or  ${TIPO_ACQUISTO.cauSconto1()}='ZDSP' )
   and UDM_COD<>'cm' 
   and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
   and (CASE
    WHEN ${ctx.ref("TLDB1_SALDO_RIGA")}.KONV_KSCHL is not null THEN 1
    ELSE 0
    END) = 1
	)  
   or
   (
   ${TIPO_ACQUISTO.cauSconto1()} in ('ZDI4','ZDI5','ZDI7','ZDSP')
    and UDM_COD<>'cm' 
    and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
    and DWD1_STRUT_COMM_COD<>'OUTLET'
   ) 
then 2
WHEN 
   ${TIPO_ACQUISTO.cauSconto1()} in ('ZDI4','ZDI5','ZDI7','ZDSP') 
     and UDM_COD<>'cm' 
     and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
     and DWD1_STRUT_COMM_COD='OUTLET'
   
then 3
WHEN ${TIPO_ACQUISTO.cauSconto1()} in ('ZDI1','ZDSP')
      and UDM_COD<>'cm' 
      and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
      and (CASE
    WHEN ${ctx.ref("TLDB1_SALDO_RIGA")}.KONV_KSCHL is not null THEN 1
    ELSE 0
    END)= 1
      then 4 else NULL END


    `;
}

function tipoAcqs2(ctx) {
  return `

   CASE WHEN ${TIPO_ACQUISTO.cauSconto2()} in ('ZDI1','ZDI4','ZDI5','ZDI7','ZDSP' ) 
   and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NOT NULL
then 1
WHEN (
    ${TIPO_ACQUISTO.cauSconto2()} in ('ZDI1','ZDI4','ZDI5','ZDI7','ZDSP' ) 
     and UDM_COD='cm'
   )
   or
   (${TIPO_ACQUISTO.cauSconto2()} IN ('ZDI1','ZDSP')
   and UDM_COD<>'cm' 
   and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
   and (CASE
    WHEN ${ctx.ref("TLDB1_SALDO_RIGA")}.KONV_KSCHL is not null THEN 1
    ELSE 0
    END)= 1)  
   or
   (
     ${TIPO_ACQUISTO.cauSconto2()} IN ('ZDI4','ZDI5','ZDI7','ZDSP')
     and UDM_COD<>'cm' 
     and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
     and DWD1_STRUT_COMM_COD<>'OUTLET'
   ) 
then 2
 WHEN (
    ${TIPO_ACQUISTO.cauSconto2()} IN ('ZDI4','ZDI5','ZDI7','ZDSP')
     and UDM_COD<>'cm' 
     and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
     and DWD1_STRUT_COMM_COD='OUTLET'
   )
then 3
WHEN ${TIPO_ACQUISTO.cauSconto2()} IN ('ZDI1','ZDSP')
and UDM_COD<>'cm' 
and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
and (CASE
    WHEN ${ctx.ref("TLDB1_SALDO_RIGA")}.KONV_KSCHL is not null THEN 1
    ELSE 0
    END)=1
then 4 else NULL END

    `;
}

function tipoAcqs3(ctx) {
  return `

  CASE WHEN ${TIPO_ACQUISTO.cauSconto3()} in ('ZDI1','ZDI4','ZDI5','ZDI7','ZDSP' ) 
   and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NOT NULL
then 1
 WHEN (
    ${TIPO_ACQUISTO.cauSconto3()} in ('ZDI1','ZDI4','ZDI5','ZDI7','ZDSP' ) 
     and UDM_COD='cm'
   )
   or
   ((${TIPO_ACQUISTO.cauSconto3()}='ZDI1' or  
   ${TIPO_ACQUISTO.cauSconto3()}='ZDSP' )
   and UDM_COD<>'cm' 
   and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
   and (CASE
    WHEN ${ctx.ref("TLDB1_SALDO_RIGA")}.KONV_KSCHL is not null THEN 1
    ELSE 0
    END)= 1)  
   or
   (
     ${TIPO_ACQUISTO.cauSconto3()} in ('ZDI4','ZDI5','ZDI7','ZDSP' ) 
     and UDM_COD<>'cm' 
     and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
     and DWD1_STRUT_COMM_COD<>'OUTLET'
   ) 
then 2
 WHEN (
   ${TIPO_ACQUISTO.cauSconto3()} in ('ZDI4','ZDI5','ZDI7','ZDSP' ) 
   and UDM_COD<>'cm' 
     and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL
     and DWD1_STRUT_COMM_COD='OUTLET'
   )
then 3
 WHEN (${TIPO_ACQUISTO.cauSconto3()}='ZDI1'  OR  
${TIPO_ACQUISTO.cauSconto3()}='ZDSP' ) 
and UDM_COD<>'cm' 
and TLDB1_SU_MISURA.DWD4_ARTICOLO_COD IS NULL 
and (CASE
    WHEN ${ctx.ref("TLDB1_SALDO_RIGA")}.KONV_KSCHL is not null THEN 1
    ELSE 0
    END)= 1
then 4 else NULL END

    `;
}

function tipoAcqs(ctx) {
  return `

  CASE WHEN  ${TIPO_ACQUISTO.tipoAcqs1(ctx)} = 1 
    or ${TIPO_ACQUISTO.tipoAcqs2(ctx)} = 1 
    or ${TIPO_ACQUISTO.tipoAcqs3(ctx)} = 1
	then 1
   WHEN ${TIPO_ACQUISTO.tipoAcqs1(ctx)} = 2 
    or ${TIPO_ACQUISTO.tipoAcqs2(ctx)} = 2 
    or ${TIPO_ACQUISTO.tipoAcqs3(ctx)} = 2
	then 2
  WHEN ${TIPO_ACQUISTO.tipoAcqs1(ctx)} = 3 
    or ${TIPO_ACQUISTO.tipoAcqs2(ctx)} = 3 
      or ${TIPO_ACQUISTO.tipoAcqs3(ctx)} = 3
	then 3
   WHEN ${TIPO_ACQUISTO.tipoAcqs1(ctx)} = 4 
  or ${TIPO_ACQUISTO.tipoAcqs2(ctx)} = 4 
  or ${TIPO_ACQUISTO.tipoAcqs3(ctx)} = 4
	then 4 
  ELSE NULL
  END
    `;
}

module.exports = {
  tipoAcqs1,
  tipoAcqs2,
  tipoAcqs3,
  tipoAcqs,
  cauSconto1,
  cauSconto2,
  cauSconto3
}
