export function LoadingAndErrorHandler({Loading,Error}){

    if (Error){
        return <ErrorMessage Error={Error} />
    }

    if (Loading){
        return <LoadingMessage/>
    }
    return <div>loading and error handler was called for no reason</div>
}

function LoadingMessage({}){
    return (
        <div>laddar..</div>
    )
}

function ErrorMessage({Error}){

    return (
        <div>ett problem har upståt: {Error}</div>
    )
}


export default LoadingAndErrorHandler