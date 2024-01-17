const prepareHateoas = async (entity, data) => {
    const results = data.map((joya) => {
        return {
          name: joya.nombre,
          href: `/${entity}/joya/${joya.id}`,
        };
      }).slice(0, 4);

    const totalJoyas = data.length;
    const stockTotal = data.reduce((accumulator, value) => accumulator + value.stock, 0);

    const HATEOAS = {
      totalJoyas,
      stockTotal,
      results,
    };
    return HATEOAS;
};
  
  
export default prepareHateoas;