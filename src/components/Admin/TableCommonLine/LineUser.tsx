
export function LineUser({itemData , activateHandler }: {itemData: any, activateHandler: any}) {
    return (
      <div className="row align-items-center border-bottom py-2">
        <div className="col">{itemData.id}</div>
        <div className="col">{itemData.name}</div>
        <div className="col">{itemData.email}</div>
        <div className="col">{new Date(itemData.created_at).toLocaleDateString('ru-RU')}</div>
        <div className="col text-center">{itemData.walletId}</div>
        <div className="col text-center">
          {itemData.telegram_id ? itemData.telegram_id : <span className="text-muted">Не подписан</span>}
        </div>
        <div className="col text-center">{itemData.is_active ? "✅" : "❌"}</div>
        <div className="col">
          <button
            className={`btn btn-sm ${itemData.is_active ? 'btn-danger' : 'btn-success'}`}
            onClick={() => activateHandler(itemData.id, itemData.is_active)}
          >
            {itemData.is_active ? "Деактивировать" : "Активировать"}
          </button>
        </div>
      </div>
    );
  }