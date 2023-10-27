const checkingForQuotationMarks = (prev:string, curr:string, next:string):string => {
    if(curr === '=') return ':';
    if(curr === '&') return ',';

    const reservedCharacters:string = '=:&,';
    let res:string = '';    

    if(
        !reservedCharacters.includes(curr) &&
        (reservedCharacters.includes(prev) || prev === undefined)
    ) res += '"';

    res += curr;

    if(
        !reservedCharacters.includes(curr) &&
        (reservedCharacters.includes(next) || next === undefined)
    ) res += '"';
    
    return res;
};

const parseStringToJson = (str:string):Promise<string> => {
    const arryFromStr = str.split('');
    const itog:string[] = [];

    return new Promise((res) => {
        for(const idx in arryFromStr) {
            const prev = arryFromStr[Number(idx)-1];
            const curr = arryFromStr[Number(idx)];
            const next = arryFromStr[Number(idx)+1];

            itog.push(
                checkingForQuotationMarks(prev, curr, next)
            );
        };

        res(JSON.parse(`
            {${itog.join('')}}
        `));
    });
};

const bodyParser = <T>(req:Request, res:Response): Promise<T> => {
    return new Promise((res, rej) => {
        let body:string = '';

        req.on('data', (data:Buffer) => {
            body += data.toString();
        });

        req.on('end', () => {
            parseStringToJson(body)
                .then((resp:T) => {
                    res(resp);
                })
                .catch(() => res(JSON.parse(body)));
        });

        req.on('error', (err:Error) => {
            rej(err);
        });
    });
};

module.exports = bodyParser;