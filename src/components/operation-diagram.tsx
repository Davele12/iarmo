export function OperationDiagram() {
  return <figure className="operation-visual" aria-label="Diagrama conceptual: conectar ventas, operación e información para tomar mejores decisiones.">
    <div className="visual-topline"><span><i /> UNA OPERACIÓN CONECTADA</span><span aria-hidden="true">↗</span></div>
    <div className="flow-inputs" aria-hidden="true"><span><span className="mini-icon">▤</span>Ventas</span><span><span className="mini-icon">▦</span>Operación</span><span><span className="mini-icon">▥</span>Información</span></div>
    <div className="flow-lines" aria-hidden="true"><span /><span /><span /></div>
    <div className="flow-core" aria-hidden="true"><span className="core-symbol">i↗</span><div>Todo empieza a conectar.<small>Procesos + datos + tecnología</small></div><span className="core-check">✓</span></div>
    <div className="flow-stem" aria-hidden="true" />
    <div className="flow-result" aria-hidden="true"><div className="result-heading"><span>Tu negocio, con más claridad.</span><span>↗</span></div><div className="concept-chart"><div><span style={{ height: '32%' }} /><span style={{ height: '47%' }} /><span style={{ height: '42%' }} /><span style={{ height: '62%' }} /><span style={{ height: '69%' }} /><span style={{ height: '85%' }} /><span style={{ height: '96%' }} /></div><p>Menos fricción.<br /><strong>Más capacidad.</strong></p></div><div className="result-tags"><span>Control</span><span>Decisiones</span><span>Continuidad</span></div></div>
    <figcaption>Una forma de pensar tu operación. Diagrama ilustrativo.</figcaption>
  </figure>;
}
