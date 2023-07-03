const { webpack } = require("webpack");

class AxialMainProcess
{
    constructor()
    {
        //super();
    }

    static minifyJS(event, params)
    {
        console.log("test ok");
        console.log(params);
        try
        {
            const webpackConfig = 
            {
                mode: params.mode,
                entry: params.jsInput,
                output:
                {
                    path: params.jsOutputPath,
                    filename: params.jsOutput
                }
            }
    
            const compiler = webpack( webpackConfig );

            compiler.run( (err, stats) =>
            {
                if( err ) { console.log(err); }
                compiler.close( (closeErr) =>
                {
                    if( closeErr ) { console.log(closeErr); }
                })
            });
        }
        catch(err)
        {
            console.log(err);
        }
        finally
        {
            console.log("DONE");
        }
    }
}

module.exports = { AxialMainProcess }