/*
* The following is a function that runs when an API endpoint is called for an internal company app.
* The request parameter contains data about the web request.
* The response parameter is a function that will return a response to the caller.
*/

import NoSqlDatabaseClient as no_sql_db_client from 'some/database/client';
import WebClient as webClient from 'some/web/client';
import md5 from 'md5';

const apiHandler = (request, response) => {
    // assigns personId to pid
    const pid = request.parameters.post.personId;
    const pn = request.parameters.post.personName;
    const ppn = request.parameters.post.personPhoneNumber;
    const psn = request.parameters.post.streetName;
    const psnu = request.parameters.post.streetNumber;
    var k = md5(pid)
    // save data
    await no_sql_db_client.save({
        tableName: 'apptableName',
        key: k,
        data: { pn, ppn, psn, psnu }
    });
    //do web call and get result
    var r = await webClient.get(`https://api.hr.badcodingcompany.com`, {
        params: {
            employeeId: k
        }
    });
    const pr = r.data.role;
    const pd = r.data.department;
    const ps = r.data.salary;
    await no_sql_db_client.update({
        tableName: 'apptableName',
        key: k,
        data: { pn, ppn, psn, psnu, pr, pd, ps }
    });
    await webClient.post(`https://api.finance.badcodingcompany.com`, {
        data: {
            personId: k,
            salary: ps
        }
    });
    response({
        statusCode: 200,
    });
};

export default apiHandler;