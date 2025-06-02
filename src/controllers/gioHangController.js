const gioHang = require('../models/gioHangModel');
class gioHangController{
    async getAllGioHang(req,res){
        try{
            const gioHangs =await gioHang.getAllcart();
            res.status(201).json(gioHangs);

        }catch (error){
            res.status(500).json({message: error.message})
        }
    }
    async createGioHang(req,res){
        try{
            const newGioHang = req.body;
            await gioHang.createcart(newGioHang)
            res.status(201).json({message:'create success'});

        }catch (error){
            res.status(500).json({message: error.message})
        }
    }
    // async updateGioHang(req, res) {
    //             try {
    //                 const { id } = req.params; 
    //                 const updatedGioHang = req.body;
    //                 updatedGioHang.id = id; 
            
    //                 // Gọi phương thức update
    //                 await gioHang.updatecart(updatedGioHang);
            
    //                 res.status(201).json({ message: 'updated success' });
    //             } catch (error) {
    //                 res.status(500).json({ message: error.message });
    //             }
    // }    
    async deleteGioHang(req, res) {
        try {
            const { id } = req.params; 
            
            const result = await gioHang.deletecart(id);
            
            res.status(201).json({ message: 'delete success' });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async deleteAllGioHang(req, res) {
        try {
            const result = await gioHang.deleteAllCart();
            
            res.status(201).json({ message: 'Deleted all success' });
    
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
        
}
module.exports = new gioHangController;