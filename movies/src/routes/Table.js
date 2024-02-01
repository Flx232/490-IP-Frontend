export default function Table({type, children}){
    return(
        <table>
          <thead>
            <tr key="Column Names">
              <th key={type}>{type}</th>
            </tr>
          </thead>
          <tbody>
            {children}
          </tbody>
        </table>
    );
}