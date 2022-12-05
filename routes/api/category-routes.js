const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint - done

router.get('/', async (req, res) => {
  try {
      // find all categories - done
  // be sure to include its associated Products - done
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
  res.status(200).json(categoryData);
} catch (err) {
  res.status(500).json(err);
}
});


// done
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {
    const categoryData = await Category.findByPk(req.params.id, {
    
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});


//done
router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
      res.status(400).json(err);
    }

});


//done
router.put('/:id', (req, res) => {
  const categoryData = Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })

  .then((categoryData) => res.json(categoryData))
  .catch((err) => {
    // console.log(err);
    res.status(400).json(err);
  });

});


//done
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }

});

module.exports = router;
