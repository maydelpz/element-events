const { onSchedule } = require('firebase-functions/v2/scheduler');
const admin = require('firebase-admin');
admin.initializeApp();

exports.eliminarPolizasExpiradas = onSchedule(
  {
    schedule: '0 3 * * *',
    timeZone: 'America/Mexico_City'
  },
  async (event) => {
    const hoy = new Date();
    const dia = hoy.getDate().toString().padStart(2, '0'); 
    const mes = (hoy.getMonth() + 1).toString().padStart(2, '0'); 
    const anio = hoy.getFullYear(); 
    
    const hoyFormatoDB = `${dia}-${mes}-${anio}`; 
    
    console.log(`[DEBUG] Buscando pólizas con vHasta = ${hoyFormatoDB}`);

    // Lista de colecciones a procesar (agregadas aquí)
    const colecciones = [
      'PolizaEmpresarial',
      'PolizaGM',
      'PolizaVida',
      'PolizaAutos'
    ];

    try {
      const db = admin.firestore();
      let totalGeneral = 0;

      // Procesamos cada colección (manteniendo tu estructura original)
      for (const coleccion of colecciones) {
        console.log(`\n=== Procesando colección: ${coleccion} ===`);
        
        // 1. Verificación de formato (debug) - para cada colección
        const ejemploDoc = await db.collection(coleccion).limit(1).get();
        ejemploDoc.forEach(doc => {
          console.log(`[DEBUG] Ejemplo de documento: vHasta = "${doc.data().vHasta}"`);
        });

        // 2. Búsqueda real
        const snapshot = await db.collection(coleccion)
          .where('vHasta', '==', hoyFormatoDB)
          .get();

        console.log(`[${coleccion}] Documentos encontrados: ${snapshot.size}`);
        
        // 3. Eliminación en lote (igual que tu versión original)
        const batch = db.batch();
        snapshot.forEach(doc => {
          console.log(`[ELIMINANDO] ${coleccion}/${doc.id} | ${doc.data().vHasta}`);
          batch.delete(doc.ref);
        });

        await batch.commit();
        console.log(`✅ ${coleccion}: ${snapshot.size} pólizas eliminadas.`);
        totalGeneral += snapshot.size;
      }

      // Resultado final (nuevo)
      console.log(`\n✅✅ Éxito total: ${totalGeneral} pólizas eliminadas de ${colecciones.length} colecciones`);
      
    } catch (error) {
      console.error('❌ Error crítico:', error);
      throw error;
    }
  }
);