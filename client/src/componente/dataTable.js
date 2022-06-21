import { useState, useEffect } from 'react'

export default function DataTable({ columns, items, pageSize, orderBy = null, message }) {

  const [data, setData] = useState(items);
  const [order, setOrder] = useState(orderBy);
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSizeNow, setPageSizeNow] = useState(pageSize);

  useEffect(() => {
    setData(items);
  }, [items])

  const setOrderBy = (field) => {

    let newOrder = null;
    if (order?.field === field) {
      newOrder = {
        field,
        asc: !order.asc
      };
    }
    else {
      newOrder = {
        field,
        asc: true
      };
    }

    setOrder(newOrder);

    const newItems = items.slice(0);

    newItems.sort((a, b) => {
      if (a[field] === b[field]) return 0;
      return ((a[field] < b[field]) ? 1 : -1) * (newOrder.asc ? 1 : -1)
    })

    setPageIndex(0);
    setData(newItems);
  }
  const TD = ({ col }) => {
    const style = col.noSort ? null : { cursor: 'pointer' };
    return (
      <td onClick={() => !col.noSort && setOrderBy(col.field)} style={style} key={col.field} width={col.width}>
        {(col.label || col.field)}
        {order?.field === col.field && (order.asc ? <span> &#8593;</span> : <span> &#8595;</span>)}
      </td>
    )
  }


  return (
    <>

      <table className="table table-hover" >
        <thead>
          <tr>
            {
              columns?.map(col => <TD col={col} />)
            }
          </tr>
        </thead>
        <tbody>
          {
            data?.slice(pageIndex * pageSizeNow, (pageIndex + 1) * pageSizeNow)?.map(row => {
              return (<tr key={row.id}>
                {
                  columns?.map(col => {
                    return <td key={row.id + col.field}>{typeof col.render === 'function' ? col.render(row) : row[col.field]}</td>
                  })
                }

              </tr>
              )
            })
          }
        </tbody>
      </table>
      {
        items === null && <div className='text-center text-muted'>{message?.loading}</div>
      }
      {
        Array.isArray(items) && items.length === 0 && <div className='text-center text-muted'>{message?.empty}</div>
      }
      {
        Array.isArray(items) && items.length > 0 &&
        <div className='text-center'>
          <select onChange={e => setPageSizeNow(e.target.value)} className='ml-5'>
            <option value='5'>5</option>
            <option value='10'>10</option>
            <option value='20'>20</option>
            <option value='50'>50</option>
            <option value='100'>100</option>
          </select>

          <button type="button" title='Prima pagină' disabled={pageIndex === 0} onClick={() => setPageIndex(0)}> &#8617;</button>
          <button type="button" title='Pagina anterioară' disabled={pageIndex < 1} className="mx-1" onClick={() => setPageIndex(pageIndex - 1)} >&#8592;</button>
          <span>{`${pageIndex + 1} / ${Math.ceil(items.length / pageSizeNow - 1) + 1}`}</span>
          <button type="button" title='Pagina următoare' className="mx-1" disabled={pageIndex >= (items.length / pageSizeNow - 1)} onClick={() => setPageIndex(pageIndex + 1)} >&#8594;</button>
          <button type="button" title='Ultima pagina' disabled={pageIndex >= (items.length / pageSizeNow - 1)} onClick={() => setPageIndex(items.length / pageSizeNow - 1)} > &#8618;</button>
        </div >
      }
    </>
  )
}