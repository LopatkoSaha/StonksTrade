
export function LineWallet({itemData , showModalHandler }: {itemData: any, showModalHandler: any}) {
    return (
      <div className="row align-items-center border-bottom py-2">
        <div className="col">{itemData.id}</div>
        <div className="col">{itemData.name}</div>
        <div className="col">{itemData.email}</div>
        <div className="col">{new Date(itemData.created_at).toLocaleDateString('ru-RU')}</div>
        <div className="col">{itemData.totalCostUsd}</div>
        <div className="col">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => showModalHandler(itemData.id)}
          >
            Редактировать
          </button>
        </div>
      </div>
    );
  }