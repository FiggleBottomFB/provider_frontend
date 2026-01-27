const BaseURL= "https://rickandmortyapi.com/api/"

export async function getCharacters(page, name="", status="", species="", type="", gender="") {
  let parameters= "?page="+ page;
  parameters+=name? "&name="+name:"";
  parameters+=status? "&status="+status:"";
  parameters+=species? "&species="+species:"";
  parameters+=type? "&type="+type:"";
  parameters+=gender? "&gender="+gender:"";


  const fetchurl=BaseURL + "character"+ parameters;

  const response = await fetch(fetchurl,
    { method: "GET" }
  );
  return response.json();
}

export async function getCharactersById(Id) {
  const response = await fetch(BaseURL + "character/"+Id,
    { method: "GET" }
  );
  return response.json();
}

